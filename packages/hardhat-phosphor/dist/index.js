"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const plugins_1 = require("hardhat/plugins");
const HardhatPhosphor_1 = require("./HardhatPhosphor");
(0, config_1.extendEnvironment)((hre) => {
    const phosphotApiKey = hre.config.phosphor.phosphorApiKey;
    const phosphorEndpoint = hre.config.phosphor.phosphorEndpoint;
    hre.phosphor = (0, plugins_1.lazyObject)(() => new HardhatPhosphor_1.HardhatPhosphor(hre, phosphorEndpoint, phosphotApiKey));
});
(0, config_1.extendConfig)((_, userConfig) => {
    if (!userConfig.phosphor ||
        !userConfig.phosphor.phosphorApiKey ||
        !userConfig.phosphor.phosphorEndpoint) {
        throw new Error('Phosphor requires an "phosphorApiKey" and "phosphorEndpoint in its configuration.');
    }
});
