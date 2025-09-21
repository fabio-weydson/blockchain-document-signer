import { useState } from "react";
import { IpfsIcon } from "../assets/Icons";
import { UploadModal } from "../components";
import { dummyDocs } from "../consts";

export default function Documents() {
  const [open, setOpen] = useState(false);

  const activeDocs = dummyDocs.filter((doc) => doc.status !== "archived");
  const archivedDocs = dummyDocs.filter((doc) => doc.status === "archived");

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          My Documents
          <span className="text-md text-gray-400 ml-2">
            ({activeDocs.length})
          </span>
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="btn-primary px-4 py-2 rounded cursor-pointer"
        >
          + New Document
        </button>
      </div>
      <ul id="document-cards-list" className="mt-4 grid lg:grid-cols-4 gap-4">
        {activeDocs.map((doc) => (
          <li
            key={doc.id}
            className="card hover:bg-gray-800 p-4 cursor-pointer"
          >
            <>
              {doc.name}
              {doc.signedDate && (
                <>
                  <div className="text-sm text-gray-400 mt-2">
                    Signed on: {doc.signedDate}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    <div className="w-5 h-5 inline-block">
                      <IpfsIcon color="#6ee7b7" />
                    </div>
                    &nbsp; IPFS: 0x1234...abcd
                  </div>
                </>
              )}
              {!doc.signed && (
                <div className="text-sm text-gray-500 mt-2">Not signed yet</div>
              )}
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
