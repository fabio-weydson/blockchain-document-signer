type IPFSFileResponse = {
  Name: string;
  Hash: string;
  Size: string;
  Type: string;
  Path: string;
};

type Document = IPFSFileResponse & {
  name?: string;
  type?: string;
  size?: string | number;
  path?: string;
  signed?: boolean;
  signedDate?: string;
  createdAt?: string;
  signatures?: Array<{
    signer: string;
    timestamp: string;
  }>;
};

export type { IPFSFileResponse, Document };
