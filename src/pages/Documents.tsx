import { useEffect, useState } from "react";
import { IpfsIcon } from "../assets/Icons";
import { UploadModal } from "../components";
import { useFiles } from "../hooks";
import { IPFSFileResponse } from "../types";

const IpfsBaseFolder = import.meta.env.REACT_APP_IPFS_BASE_DIR || "docs";

export default function Documents() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<IPFSFileResponse[]>([]);
  const { getAllFiles } = useFiles();

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getAllFiles(IpfsBaseFolder);
      setFiles(files || []);
    };
    fetchFiles();
  }, []);

  const archivedDocs = [];

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          My Documents
          <span className="text-md text-gray-400 ml-2">({files.length})</span>
        </h1>
        &nbsp;
        <button
          onClick={() => setOpen(true)}
          className="btn-primary px-4 py-2 rounded cursor-pointer"
        >
          + New Document
        </button>
      </div>
      <ul id="document-cards-list" className="mt-4 grid lg:grid-cols-4 gap-4">
        {files &&
          files.map((doc) => (
            <li
              key={doc.Hash}
              className="card hover:bg-gray-800 p-4 cursor-pointer"
            >
              <>
                {doc.Name}
                {/* {doc.signedDate && doc.signedDate && (
                  <div className="text-sm text-gray-400 mt-2">
                    Signed on: {doc.signedDate}
                  </div>
              )} */}
                <div className="text-sm text-gray-500 mt-2">
                  <div className="w-5 h-5 inline-block">
                    <IpfsIcon color="#6ee7b7" />
                  </div>
                  &nbsp; IPFS:{" "}
                  <span className="font-mono text-green-300/80">
                    0x1234...abcd
                  </span>
                </div>
                {/* {!doc.signed && (
                  <div className="text-sm text-gray-500 mt-2">Not signed yet</div>
                )} */}
              </>
            </li>
          ))}
        <li
          id="bin"
          className="card hover:bg-gray-800 p-4 cursor-pointer lg:hidden"
        >
          <div className="text-center text-gray-500">
            🗑️ Archive ({archivedDocs.length})
          </div>
        </li>
      </ul>
      <UploadModal open={open} setOpen={setOpen} />
    </>
  );
}
