import { IpfsIcon } from "../../assets/Icons";

interface DocumentItemProps extends React.HTMLAttributes<HTMLLIElement> {
  index: number;
  Name: string;
  Hash: string;
  SignedDate?: string;
  Signed?: boolean;
  clickOpenDoc: (index: number) => void;
}

export default function DocumentItem({
  index,
  Name,
  Hash,
  SignedDate,
  Signed,
  clickOpenDoc,
}: DocumentItemProps) {
  const docNameFormatted =
    Name.length > 30 ? Name.substring(0, 30) + "..." : Name;

  const docHashFormatted =
    Hash.length > 20
      ? Hash.substring(0, 6) + "..." + Hash.substring(Hash.length - 6)
      : Hash;

  return (
    <li
      onClick={() => clickOpenDoc(index)}
      className="card hover:bg-gray-800 p-4 cursor-pointer"
    >
      <>
        <span className="break-words text-sm font-medium">
          {docNameFormatted}
        </span>
        {SignedDate && (
          <div className="text-sm text-gray-400 mt-2">
            Signed on: {SignedDate}
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
        {!Signed && (
          <div className="text-sm text-gray-500 mt-2">Not signed yet</div>
        )}
      </>
    </li>
  );
}
