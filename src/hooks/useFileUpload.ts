import { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { IPFSFileResponse } from "../types";

export const useFileUpload = () => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<{ message: string } | null>(null);

  const uploadFile = async (
    formData: FormData
  ): Promise<IPFSFileResponse | undefined> => {
    setProgress(0);
    setError(null);

    const fileName = formData.get("fileName") as string;
    const fileType = formData.get("fileType") as string | undefined;
    const ipfsPath = `/docs/${fileName}.${fileType || ""}`;

    try {
      const result = await axios
        .post(
          `http://127.0.0.1:5001/api/v0/add?to-files=${encodeURIComponent(ipfsPath)}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            responseType: "json",
            onUploadProgress: (event: AxiosProgressEvent) => {
              if (!event.total) return;
              const percent = Math.round((event.loaded * 100) / event.total);
              setProgress(percent);
            },
          }
        )
        .then((res) => res.data);

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
};
