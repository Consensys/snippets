import "hardhat/types/runtime";
import { HardhatPhosphor } from "./HardhatPhosphor";

interface PhosphorPluginUserConfig {
  phosphorEndpoint: string;
  phosphorApiKey: string;
}

declare module 'hardhat/types/config' {
  export interface HardhatUserConfig {
    phosphor: PhosphorPluginUserConfig;
  }

  interface HardhatConfig {
    phosphor: PhosphorPluginUserConfig;
  }
}

declare module "hardhat/types/runtime" {
  interface HardhatRuntimeEnvironment {
    phosphor: HardhatPhosphor;
  }
}

