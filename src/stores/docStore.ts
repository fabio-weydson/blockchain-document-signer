import { create } from "zustand";
import { Document } from "../types";

interface DocState {
  documents: Document[];
  setDocuments: (docs: Document[]) => void;
  getDocuments: () => Document[];
  addDocument: (doc: Document) => void;
  removeDocument: (hash: string) => void;
}

export const docStore = create<DocState>()((set, get) => ({
  documents: [],
  setDocuments: (docs: Document[]) => set(() => ({ documents: docs })),
  addDocument: (doc: Document) =>
    set((state) => ({ documents: [...state.documents, doc] })),
  removeDocument: (hash: string) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.Hash !== hash),
    })),
  getDocuments: () => get().documents,
}));
