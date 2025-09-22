import React, { useState } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { useFileUpload } from "../../hooks";
import { docStore } from "../../stores/docStore";
import { DocIcon } from "../../assets/Icons";

import { IPFSFileResponse } from "../../types";

export default function UploadModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { progress, error, uploadFile } = useFileUpload();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<IPFSFileResponse | null>(
    null
  );
  const { addDocument } = docStore();

  const handleFileUpload = () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file?.name || "untitled");
    formData.append("fileType", file?.type || "application/octet-stream");

    if (!file) return;

    uploadFile(formData)
      .then((res) => {
        if (res) {
          addDocument(res);
          setUploadedFile(res);
        }
      })
      .catch((err) => {
        alert("File upload failed: " + err?.message);
      });
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/90 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="mx-auto flex size-12 p-2 shrink-0 items-center justify-center rounded-full bg-gray-200/10 sm:mx-0 sm:size-10">
                  <DocIcon color="#6ee7b7" />
                </div>
                <div className="mt-3 text-center flex-2 sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-white"
                  >
                    New Document
                  </DialogTitle>

                  {!uploadedFile && (
                    <>
                      <div className="mt-2">
                        <p className="text-sm text-gray-400">
                          Select a document to upload and sign digitally.
                        </p>
                      </div>
                      <div className="mt-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="text-sm text-gray-400 file:bg-gray-200 file:text-gray-700 file:border-0 file:rounded file:px-3 file:py-2 file:text-sm file:font-semibold file:hover:bg-gray-700"
                        />
                      </div>
                    </>
                  )}

                  {progress > 0 && !uploadedFile && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`bg-cyan-600 h-2.5 rounded-full ${progress === 0 ? "w-0" : "w-full"}`}
                        ></div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="mt-2 text-sm text-red-400">
                      Error: {error?.message}
                    </div>
                  )}

                  {uploadedFile && (
                    <div className="mt-2 text-md">
                      File uploaded successfully!
                      <br /> IPFS Hash:{" "}
                      <span className="font-mono text-green-400">
                        {uploadedFile.Hash.substring(0, 10)}...
                        {uploadedFile.Hash.substring(
                          uploadedFile.Hash.length - 10
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!uploadedFile && (
              <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className="inline-flex w-full justify-center rounded-md btn-primary px-3 py-2 text-sm font-semibold hover:bg-white sm:ml-3 sm:w-auto"
                >
                  Upload
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            )}

            {uploadedFile && (
              <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            )}
            {/* TODO: Open document button */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
