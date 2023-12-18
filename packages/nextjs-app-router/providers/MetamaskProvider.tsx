/* @cheatsheet
    {
        "flow": "Connect to MetaMask",
        "step": 1,
        "title": "Import MetaMaskProvider",
        "description": "Use @metamask/sdk-react npm package"
    }
    */
import { MetaMaskProvider as MetaMaskContextProvider } from "@metamask/sdk-react";
import { FC } from "react";

interface MetaMaskProviderProps {
  children: React.ReactNode;
}

const MetaMaskProvider: FC<MetaMaskProviderProps> = ({ children }) => {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

      /* @cheatsheet
    {
        "flow": "Connect to MetaMask",
        "step": 3,
        "title": "SDK Options",
        "description": "The SDK options are passed to the MetaMask Context Provider."
    }
    */
  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "EventSea",
      url: host,
    },
  };

  /* @cheatsheet
    {
        "flow": "Connect to MetaMask",
        "step": 2,
        "title": "Wrap your app with MetaMaskProvider",
        "description": "The children of this component will have access to the MetaMask Context"
    }
    */
  return (
    <MetaMaskContextProvider debug={false} sdkOptions={sdkOptions}>
      {children}
    </MetaMaskContextProvider>
  );
};

export default MetaMaskProvider;
