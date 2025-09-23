import { IpfsIcon } from "../../assets/Icons";
import { Document } from "../../types";
import { formatHash } from "../../utils";

interface DocumentItemProps extends Document {
  index: number;
  clickOpenDoc: (index: number) => void;
}

export default function DocumentItem({
  index,
  Name,
  Hash,
  signedDate,
  signed,
  clickOpenDoc,
}: DocumentItemProps) {
  const docNameFormatted =
    Name.length > 30 ? Name.substring(0, 30) + "..." : Name;

  const docHashFormatted = formatHash(Hash);

  return (
    <li
      onClick={() => clickOpenDoc(index)}
      className="card hover:bg-gray-800 p-4 cursor-pointer"
    >
      <>
        <span className="break-words text-sm font-medium">
          {docNameFormatted}
        </span>
        {signedDate && (
          <div className="text-sm text-gray-400 mt-2">
            Signed on: {signedDate}
          </div>
        )}
        <div className="text-sm text-gray-500 mt-2">
          <div className="w-5 h-5 inline-block">
            <IpfsIcon color="#6ee7b7" />
          </div>
          &nbsp; IPFS:{" "}
          <span className="font-mono text-green-300/80">
            {docHashFormatted}
          </span>
        </div>
        {!signed && (
          <div className="text-sm text-gray-500 mt-2">Not signed yet</div>
        )}
      </>
    </li>
  );
}
