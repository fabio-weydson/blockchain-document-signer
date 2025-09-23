type IPFSFileResponse = {
  Name: string;
  Hash: string;
  Size: string;
  Type: string;
  Path: string;
};

type Signature = {
  signer: string;
  timestamp: string;
  signature?: string;
};

type Document = IPFSFileResponse & {
  name?: string;
  type?: string;
  size?: string | number;
  path?: string;
  signed?: boolean;
  signedDate?: string;
  createdAt?: string;
  signatures?: Array<Signature>;
};

export type { IPFSFileResponse, Document, Signature };
