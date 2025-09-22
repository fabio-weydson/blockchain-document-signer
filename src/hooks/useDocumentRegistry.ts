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

  return {
    totalDocuments,
    allDocuments,
    totalDocumentsError,
    allDocumentsError,
    allDocumentsPending,
    totalDocumentsPending,
  };
}
