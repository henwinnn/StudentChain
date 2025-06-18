"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MonadNetwork } from "@/chain/Monad";
import { Geist, Geist_Mono } from "next/font/google"; // Add this import
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// Set up the RainbowKit configuration with your custom chain
const config = getDefaultConfig({
  appName: "Monad Network App",
  projectId: "YOUR_PROJECT_ID", // Replace with your WalletConnect projectId
  chains: [MonadNetwork],
});

const queryClient = new QueryClient();


export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider modalSize="compact" theme={darkTheme()}>
              {children}
              <Toaster/>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
