type IPFSFileResponse = {
  Name: string;
  Hash: string;
  Size: string;
  Type: string;
  Path: string;
  Owner?: string; // Future use: Ethereum address of the owner
  Signed: boolean;
  SignedDate?: string;
  Signatures?: Array<{
    signer: string;
    signature: string;
    date?: string;
  }>;
};

export type { IPFSFileResponse };
