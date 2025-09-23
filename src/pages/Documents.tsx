import { useEffect, useState, useCallback, useMemo } from "react";
import { DocumentItem, UploadModal } from "../components";
import { useFiles, useDocumentRegistry } from "../hooks";
import { docStore } from "../stores/docStore";
import DocumentViewModal from "../components/documents/DocumentViewModal";

const IpfsBaseFolder = import.meta.env.REACT_APP_IPFS_BASE_DIR || "docs";

export default function Documents() {
  const [open, setOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const { documents, setDocuments } = docStore();
  const { getAllFiles } = useFiles();
  const {
    totalDocuments,
    allDocuments,
    totalDocumentsError,
    allDocumentsError,
  } = useDocumentRegistry();

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getAllFiles(IpfsBaseFolder);
      setDocuments(files || []);
    };
    fetchFiles();
  }, []);

  useEffect(() => {
    if (totalDocumentsError || allDocumentsError) {
      alert("Error fetching documents from contract.");
      console.error(
        `Error fetching documents from contract. ${totalDocumentsError || allDocumentsError}`
      );
      return;
    }

    if (!totalDocuments || !allDocuments) return;

    const fetchDocuments = async () => {
      const docs = allDocuments;
      const _docs = documents.map((doc) => {
        const match = Object.values(docs).find((d: any) => d.cid === doc.Hash);
        return {
          ...doc,
          Signed: match?.signed || false,
        };
      });
      setDocuments(_docs);
    };
    fetchDocuments();
  }, [allDocuments, setDocuments, totalDocumentsError, allDocumentsError]);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleOpenDocument = useCallback(
    (index: number) => {
      const doc = documents[index];
      setSelectedDoc(doc);
    },
    [documents]
  );

  const archivedDocs: any[] = [];

  const documentCount = useMemo(() => documents.length, [documents]);
  const archivedDocsCount = useMemo(() => archivedDocs.length, [archivedDocs]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          My Documents
          <span className="text-md text-gray-400 ml-2">({documentCount})</span>
        </h1>
        &nbsp;
        <button
          onClick={handleOpenModal}
          className="btn-primary px-4 py-2 rounded cursor-pointer"
        >
          + New Document
        </button>
      </div>
      <ul id="document-cards-list" className="mt-4 grid lg:grid-cols-4 gap-4">
        {documents && documents.length > 0 ? (
          documents.map((doc, index) => (
            <DocumentItem
              clickOpenDoc={() => handleOpenDocument(index)}
              index={index}
              key={index}
              {...doc}
            />
          ))
        ) : (
          <li
            id="bin"
            className="card hover:bg-gray-800 p-4 cursor-pointer lg:hidden"
          >
            <div className="text-center text-gray-500">
              🗑️ Archive ({archivedDocsCount})
            </div>
          </li>
        )}
      </ul>
      <UploadModal open={open} setOpen={setOpen} />
      {selectedDoc && (
        <DocumentViewModal {...selectedDoc} setSelectedDoc={setSelectedDoc} />
      )}
    </>
  );
}
