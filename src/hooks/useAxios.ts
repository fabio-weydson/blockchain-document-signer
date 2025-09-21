import axios from "axios";

const IPFSapiUrl = import.meta.env.VITE_IPFS_API_URL;

export default function useAxios() {
  const client = axios.create({ baseURL: IPFSapiUrl });
  return { client };
}
