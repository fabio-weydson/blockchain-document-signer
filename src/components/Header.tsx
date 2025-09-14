import { useAccount, useConnect, useDisconnect } from "wagmi";

const Header = () => {
  const { connectors, connect, status, error } = useConnect();
  const account = useAccount();
  const { disconnect } = useDisconnect();

  const handleAccountConnection = (event: any) => {
    const index = event.target.value;
    console.log("Connect Wallet button clicked");
    try {
      const connector = connectors?.[index];
      connect({ connector });
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">Blockchain Document Signing</h1>
      <p className="mt-2">Securely sign your documents on the blockchain</p>
      <div id="wallet-connection" className="mt-4 absolute top-4 right-4">
        {account?.isConnected && (
          <div className="flex items-center">
            <p title={account.addresses?.[0]}>
              Connected as: {account.addresses?.[0]?.substring(0, 6)}...
              {account.addresses?.[0]?.substring(38)}
            </p>
            <span className="ml-2 inline-block w-3 h-3 bg-green-500 rounded-full"></span>
            <button
              onClick={() => disconnect()}
              className="ml-4 bg-red-900 text-white px-2 py-1 rounded"
            >
              Disconnect
            </button>
          </div>
        )}

        {!account?.isConnected && (
          <select
            onChange={handleAccountConnection}
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
