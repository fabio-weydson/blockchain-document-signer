import { useEffect, useState, useCallback, useMemo } from "react";
import { IpfsIcon } from "../assets/Icons";
import { UploadModal } from "../components";
import { useFiles, useDocumentRegistry } from "../hooks";
import { docStore } from "../stores/docStore";

const IpfsBaseFolder = import.meta.env.REACT_APP_IPFS_BASE_DIR || "docs";

export default function Documents() {
  const [open, setOpen] = useState(false);
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
      alert("Error fetching documents from contract");
      console.error("Error fetching documents from contract");
      return;
    }
    if (!totalDocuments || !allDocuments) return;
    const fetchDocuments = async () => {
      const docs = await allDocuments;
      const _docs = documents.map((doc) => {
        const match = Object.values(docs).find((d: any) => d.cid === doc.Hash);
        if (match) {
          doc.Signed = match.signed;
        }
        return doc;
      });
      console.log("Fetched documents from contract:", docs);
      console.log("Updated local documents with signing info:", _docs);
      setDocuments([..._docs]);
    };
    fetchDocuments();
  }, [allDocuments, setDocuments, totalDocumentsError, allDocumentsError]);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

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
          documents.map((doc) => {
            const docNameFormatted =
              doc.Name.length > 30
                ? doc.Name.substring(0, 30) + "..."
                : doc.Name;
            const docHashFormatted =
              doc.Hash.length > 20
                ? doc.Hash.substring(0, 6) +
                  "..." +
                  doc.Hash.substring(doc.Hash.length - 6)
                : doc.Hash;
            return (
              <li
                key={doc.Hash}
                className="card hover:bg-gray-800 p-4 cursor-pointer"
              >
                <>
                  <span className="break-words text-sm font-medium">
                    {docNameFormatted}
                  </span>
                  {doc.SignedDate && (
                    <div className="text-sm text-gray-400 mt-2">
                      Signed on: {doc.SignedDate}
                    </div>
                  )}
                  <div className="text-sm text-gray-500 mt-2">
                    <div className="w-5 h-5 inline-block">
                      <IpfsIcon color="#6ee7b7" />
                    </div>
                    &nbsp; IPFS:{" "}
                    <span className="font-mono text-green-300/80">
                      {docHashFormatted}
                    </span>
                  </div>
                  {!doc.Signed && (
                    <div className="text-sm text-gray-500 mt-2">
                      Not signed yet
                    </div>
                  )}
                </>
              </li>
            );
          })
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
    </>
  );
}
