import { useEffect } from "react";
import { useWeb3 } from "../hooks";
import { formatHash } from "../utils";

const Header = () => {
  const { account, connectors, connectWallet, disconnectWallet, error } =
    useWeb3();

  const handleAccountConnection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const index = Number(event.target.value);
    connectWallet(index);
  };

  const handleAccountDisconnection = () => {
    disconnectWallet();
  };

  useEffect(() => {
    if (error) {
      console.error("Error connecting to wallet:", error);
      alert(`Error connecting to wallet. Please check logs.`);
    }
  }, [error]);

  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">Blockchain Document Signing</h1>
      <p className="mt-2 sm:mt-0 text-gray-400">
        Securely sign your documents on the blockchain
      </p>
      <div
        id="wallet-connection"
        className={`mt-4 lg:absolute top-4 right-4  p-2 rounded ${account?.isConnected ? "bg-gray-700" : ""} `}
      >
        {account?.isConnected && (
          <div className="flex items-center justify-center">
            <p title={account.addresses?.[0]}>
              Connected as: {formatHash(account.addresses?.[0] || "")}
            </p>
            <span className="ml-2 inline-block w-3 h-3 bg-green-500 rounded-full"></span>
            <button
              onClick={handleAccountDisconnection}
              className="ml-4 bg-red-900 text-white px-2 py-1 rounded"
            >
              Disconnect
            </button>
          </div>
        )}

        {!account?.isConnected && (
          <select
            onChange={handleAccountConnection}
            className="btn-alt text-white px-4 py-2 rounded"
          >
            <option value="">Connect Wallet</option>
            {connectors?.map((connector: any, index: number) => (
              <option key={connector.id} value={index}>
                {connector.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div id="menu">
        <nav className="mt-4">
          <ul className="flex space-x-4">
            <li className="font-bold *:underline">
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/documents/sign" className="hover:underline">
                Sign Document
              </a>
            </li>
            <li>
              <a href="/documents/verify" className="hover:underline">
                Verify Document
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
