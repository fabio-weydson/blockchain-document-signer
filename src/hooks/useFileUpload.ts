import { useState } from "react";
import { AxiosProgressEvent } from "axios";
import { IPFSFileResponse } from "../types";

import useAxios from "./useAxios";

const IpfsApiUrl = import.meta.env.VITE_IPFS_API_URL;
const IpfsBaseFolder = import.meta.env.VITE_IPFS_BASE_DIR || "docs";

export default function useFileUpload() {
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
