import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "./index.css";
import Header from "./components/Header.tsx";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </WagmiProvider>
);
