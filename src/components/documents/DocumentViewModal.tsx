import { Document, Signature } from "../../types";
import { docNameSlugify, formatHash } from "../../utils";
import { useNavigate } from "react-router-dom";

interface DocumentViewModalProps extends Document {
  setSelectedDoc: (doc: any) => void;
}

export default function DocumentViewModal({
  Hash,
  Name,
  Size,
  signed,
  createdAt,
  signatures,
  setSelectedDoc,
}: DocumentViewModalProps) {
  const docHashFormatted = formatHash(Hash);
  const docSlug = docNameSlugify(Hash, Name);
  const navigate = useNavigate();

  return (
    <div id="document-details-modal">
      <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setSelectedDoc(null)}
            aria-label="Close"
          >
            <span className="text-3xl">&times;</span>
          </button>
          <h2 className="text-xl font-bold mb-4">
            <i className="w-3 h-5 inline-block mr-2">📄</i> Document Details
          </h2>
          <div className="mb-4 space-y-0.5">
            <div>
              <span className="font-semibold ">Name:</span>{" "}
              <span className="text-gray-400">{Name}</span>
            </div>
            <div>
              <span className="font-semibold">Hash (CID):</span>{" "}
              <span className="text-gray-400">{docHashFormatted}</span>
            </div>
            <div>
              <span className="font-semibold">Size:</span>{" "}
              <span className="text-gray-400">{Size} bytes</span>
            </div>
            <div>
              <span className="font-semibold">Signed:</span>{" "}
              <span className="text-gray-400">{signed ? "Yes" : "No"}</span>
            </div>
            {createdAt && (
              <div>
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(createdAt).toLocaleString()}
              </div>
            )}
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Signatures:</h3>
            {signatures && signatures.length > 0 ? (
              <ul className="list-disc list-inside">
                {signatures.map((sig: Signature, idx: number) => {
                  const signerFormatted = formatHash(sig.signer);
                  return (
                    <li key={idx}>
                      {signerFormatted}{" "}
                      {sig.timestamp &&
                        `- ${new Date(sig.timestamp).toLocaleString()}`}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-gray-500">No signatures yet.</div>
            )}
          </div>
          <div className="flex gap-2">
            <a
              href={`https://ipfs.io/ipfs/${Hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-4 py-2 rounded"
              download={Name}
            >
              Download
            </a>
            <button
              className="btn-secondary px-4 py-2 rounded"
              onClick={() =>
                navigate(`/sign/${docSlug}`, {
                  state: { doc: { Hash } },
                })
              }
            >
              Sign Document
            </button>
            <button
              className="btn-alt px-4 py-2 rounded"
              onClick={() =>
                navigate(`/documents/${docSlug}/request`, {
                  state: { doc: { Hash, Name } },
                })
              }
            >
              Request Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
