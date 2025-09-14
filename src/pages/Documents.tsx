export default function Documents() {
  const dummyDocs = [
    { id: 1, name: "Document 1", signed: true, signedDate: "2024-06-01" },
    { id: 2, name: "Document 2", signed: false, signedDate: null },
    { id: 3, name: "Document 3", signed: false, signedDate: null },
  ];
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">My Documents</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + New Document
        </button>
      </div>
      <h1>My Documents</h1>
      <ul id="document-cards-list" className="mt-4 grid grid-cols-4 gap-4">
        {dummyDocs.map((doc) => (
          <li
            key={doc.id}
            className="border p-4 mb-2 rounded cursor-pointer flex flex-col items-center justify-center bg-gray-50 text-2xl font-bold text-blue-600 hover:bg-gray-100"
          >
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0013.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              {doc.name}
              {doc.signedDate && (
                <div className="text-sm text-gray-500 mt-2">
                  Signed on: {doc.signedDate}
                </div>
              )}
            </>
          </li>
        ))}
      </ul>
    </>
  );
}
