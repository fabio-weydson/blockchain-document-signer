import { useReadContract } from "wagmi";
import DocumentRegistryJsonABI from "../abi/DocumentRegistry.json";

export default function useDocumentRegistry() {
  const DocumentRegistryContractABI = DocumentRegistryJsonABI.abi;
  const {
    data: totalDocuments,
    isPending: totalDocumentsPending,
    isError: totalDocumentsError,
  } = useReadContract({
    address: "0xaC14457Ba6c9563c2e7436f92beD4f6F25c05916",
    abi: DocumentRegistryContractABI,
    functionName: "getDocumentCount",
    args: [],
  });

  const {
    data: allDocuments,
    isPending: allDocumentsPending,
    isError: allDocumentsError,
  } = useReadContract({
    address: "0xaC14457Ba6c9563c2e7436f92beD4f6F25c05916",
    abi: DocumentRegistryContractABI,
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
