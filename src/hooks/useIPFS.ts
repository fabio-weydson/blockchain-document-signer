import { useState } from "react";
import useAxios from "./useAxios";

import { AxiosProgressEvent } from "axios";
import { IPFSFileResponse } from "../types";

const IpfsApiUrl = import.meta.env.VITE_IPFS_API_URL;
const IpfsBaseFolder = import.meta.env.VITE_IPFS_BASE_DIR || "docs";

function useFiles() {
  const { client } = useAxios();

  const getAllFiles = async (
    dir?: string
  ): Promise<IPFSFileResponse[] | null> => {
    try {
      const response = await client.post(
        `files/ls?${dir ? `arg=/${dir}` : "arg=/"}&long=true&U=true`
      );
      return response.data.Entries || [];
    } catch (error) {
      console.error("Error fetching IPFS file:", error);
      return null;
    }
  };

  const getFile = async (path: string): Promise<Blob | null> => {
    try {
      const response = await client.get(`files/${path}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching IPFS file:", error);
      return null;
    }
  };

  return {
    getAllFiles,
    getFile,
  };
}

function useFileUpload() {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<{ message: string } | null>(null);
  const { client } = useAxios();

  const uploadFile = async (
    formData: FormData
  ): Promise<IPFSFileResponse | undefined> => {
    setProgress(0);
    setError(null);

    const fileName = formData.get("fileName") as string;
    const fileType = formData.get("fileType") as string;
    const ipfsPath = `/${IpfsBaseFolder}/${fileName}`;

    try {
      const result = await client
        .post(`${IpfsApiUrl}/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event: AxiosProgressEvent) => {
            if (!event.total) return;
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          },
        })
        .then(
          (res) =>
            JSON.parse(res.data.trim().split("\n")[0]) as IPFSFileResponse
        );

      // Copying the uploaded file to MFS
      if (result && result.Hash) {
        await client.post(`files/cp?arg=/ipfs/${result.Hash}&arg=${ipfsPath}`);
      }

      return {
        Hash: result.Hash,
        Name: fileName,
        Type: fileType || "",
        Size: result.Size,
        Path: ipfsPath,
      };
    } catch (err: any) {
      const message =
        err?.message || "An unknown error occurred during file upload.";
      setError({ message });
      return undefined;
    }
  };

  return { progress, error, uploadFile };
}

export { useFiles, useFileUpload };
