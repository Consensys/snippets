import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';
import "hardhat-deploy";
import "hardhat-phosphor"

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  phosphor: {
    phosphorEndpoint: "https://admin-api.consensys-nft.com",
    phosphorApiKey: "d7e0696ff49f4ca8ba5d585bfe46f71b",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {},
};

export default config;
