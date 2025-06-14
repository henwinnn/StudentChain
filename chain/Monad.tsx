import { Chain } from "@rainbow-me/rainbowkit";

// Define the Pharos Network as a custom chain
export const MonadNetwork = {
  id: 10143,
  name: "Monad Testnet",
  iconUrl: "", // Replace with actual logo URL if available
  iconBackground: "#fff",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH", // Replace with the actual token symbol if different
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.monad.xyz"],
      webSocket: ["wss://monad-testnet.drpc.org"],
    },
  },

} as const satisfies Chain;