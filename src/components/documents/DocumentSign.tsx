import { useState } from "react";

export default function Sign() {
  const [page, setPage] = useState(1);
  const sampleDocument = {
    name: "SampleDocument.pdf",
    hash: "0x1234567890abcdef1234567890abcdef12345678",
    pages: 5,
  };

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > sampleDocument.pages) return;
    setPage(newPage);
  };
  return (
    <div className="flex flex-col bg-gray-800">
      {/* Top bar with Download and Share */}
      <div className="flex justify-between items-center p-4 bg-gray-700 shadow">
        <div className="text-lg font-semibold">
          Signing: {sampleDocument.name}
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded btn-secondary text-white hover:bg-blue-600 transition">
            Download
          </button>
          <button className="px-3 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-300 transition">
            Share
          </button>
        </div>
      </div>

      {/* Document Preview */}
      <div className="flex-1 flex flex-col p-4">
        <div className="w-full bg-white rounded shadow p-4 flex flex-col items-center">
          <img
            src="https://thefusebase.com/wp-content/uploads/2023/05/Contractor-Agreement-791x1024.png"
            alt="Document Preview"
            className="w-full object-contain rounded mb-4 border"
          />
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-500"
              aria-label="Previous page"
              onClick={() => changePage(page - 1)}
            >
              &lt;
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {sampleDocument.pages}
            </span>
            <button
              className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-500"
              aria-label="Next page"
              onClick={() => changePage(page + 1)}
            >
              &gt;
            </button>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full font-bold">
            <button className="flex-1 px-4 py-2 rounded btn-secondary  transition">
              Sign
            </button>
            <button className="flex-1 px-4 py-2 rounded btn-secondary transition">
              Request Signature
            </button>
            <button className="flex-1 px-4 py-2 rounded bg-red-700 hover:bg-red-600 transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
