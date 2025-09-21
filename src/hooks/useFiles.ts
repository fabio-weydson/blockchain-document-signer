import { IPFSFileResponse } from "../types";
import useAxios from "./useAxios";

export default function useFiles() {
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
