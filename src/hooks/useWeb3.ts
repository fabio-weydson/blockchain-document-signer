import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function useWeb3() {
  const account = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = (connectorIndex: number) => {
    connect({ connector: connectors[connectorIndex] });
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return {
    account,
    connectors,
    error,
    connectWallet,
    disconnectWallet,
  };
}
