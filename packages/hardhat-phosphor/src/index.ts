import { extendConfig, extendEnvironment } from "hardhat/config";
import { lazyObject } from "hardhat/plugins";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatPhosphor } from "./HardhatPhosphor";

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  const phosphotApiKey = hre.config.phosphor.phosphorApiKey;
  const phosphorEndpoint = hre.config.phosphor.phosphorEndpoint;

  hre.phosphor = lazyObject(
    () => new HardhatPhosphor(hre, phosphorEndpoint, phosphotApiKey)
  );
});

extendConfig((_, userConfig) => {
  if (
    !userConfig.phosphor ||
    !userConfig.phosphor.phosphorApiKey ||
    !userConfig.phosphor.phosphorEndpoint
  ) {
    throw new Error(
      'Phosphor requires an "phosphorApiKey" and "phosphorEndpoint in its configuration.'
    );
  }
});
