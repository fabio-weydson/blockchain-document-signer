import { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";

export const useFileUpload = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFile = async (file: File) => {
    try {
      const response = await axios.post("/api/upload", file, {
        onUploadProgress: (event: AxiosProgressEvent) => {
          if (!event.total) return;
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("File upload error:", err);
      setError(err);
      throw err;
    }
  };

  return { progress, error, uploadFile };
};
