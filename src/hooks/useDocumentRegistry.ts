import { useReadContract } from "wagmi";
import { documentRegistryConfig } from "../contracts/documentRegistry.config";

export default function useDocumentRegistry() {
  const {
    data: totalDocuments,
    isPending: totalDocumentsPending,
    isError: totalDocumentsError,
  } = useReadContract({
    ...documentRegistryConfig,
    functionName: "getDocumentCount",
    args: [],
  });

  const {
    data: allDocuments,
    isPending: allDocumentsPending,
    isError: allDocumentsError,
  } = useReadContract({
    ...documentRegistryConfig,
    functionName: "getAllDocuments",
    args: [],
  });

  const documentById = (id: string) => {
    return useReadContract({
      ...documentRegistryConfig,
      functionName: "getDocument",
      args: [id],
    });
  };

  return {
    documentById,
    totalDocuments,
    allDocuments,
    totalDocumentsError,
    allDocumentsError,
    allDocumentsPending,
    totalDocumentsPending,
  };
}
