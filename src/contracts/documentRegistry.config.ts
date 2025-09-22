import DocumentRegistryContractABI from "../abi/DocumentRegistry.json";
export const documentRegistryConfig = {
  address: import.meta.env.VITE_DOCUMENT_REGISTRY_ADDRESS,
  abi: DocumentRegistryContractABI,
};
