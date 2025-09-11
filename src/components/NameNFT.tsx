import React from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { wagmiMintExampleABI } from "../generated";

const NameNFT: React.FC = () => {
  const { writeContract } = useWriteContract();

  const { data: total } = useReadContract({
    address: "0xF8B4D52D561583970D461cE448eE4a552c247DeA", // replace with your contract address
    abi: wagmiMintExampleABI,
    functionName: "retrieve",
  });

  return (
    <div className="p-4 border rounded-md m-4">
      <h1 className="text-lg font-bold">NameNFT Component</h1>
      {total?.toString() && <p>{`Value: ${Number(total)}`}</p>}
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={async () => {
          const newValue = total ? Number(total) + 1 : 1;
          console.log("New Value:", newValue);
          await writeContract({
            abi: wagmiMintExampleABI,
            address: "0xF8B4D52D561583970D461cE448eE4a552c247DeA",
            functionName: "store",
            args: [BigInt(newValue)],
          });
        }}
      >
        Transfer
      </button>
    </div>
  );
};

export default NameNFT;
