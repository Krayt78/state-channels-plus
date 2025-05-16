import "tsconfig-paths/register";
import path from "path";
import moduleAlias from "module-alias";

// Resolve the path to the dependency's "src" directory within its "dist" folder.
// This is where modules like 'Clock.js' are expected to be if '@/' is used as a prefix
// by the compiled code in '@peer3/state-channels-plus/dist/src/index.js'.
const dependencyInternalSrcPath = path.resolve(
    __dirname, // Current directory of hardhat.config.ts (examples/TicTacToe)
    "node_modules",
    "@peer3",
    "state-channels-plus",
    "dist",
    "src"
);

// Add the alias for the dependency.
// When require('@/Clock') is encountered from the dependency,
// it will look for 'Clock.js' (or Clock/index.js etc.) in dependencyInternalSrcPath.
moduleAlias.addAlias("@", dependencyInternalSrcPath);

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    networks: {
        hardhat: {
            gasPrice: 0, // Set gas price to 0
            // hardfork: "berlin", // Use the Berlin hardfork
            // minGasPrice: 0, // Set minimum gas price to 0
            initialBaseFeePerGas: 0, // Set initial base fee per gas to 0
            mining: {
                auto: false, // Disable automatic mining
                interval: 2000 // Set block interval to 2 seconds (2000ms)
            },
            accounts: {
                accountsBalance: "0"
            }
        }
    },
    solidity: {
        version: "0.8.26",
        settings: {
            viaIR: true, // Enable the via-IR pipeline
            optimizer: {
                enabled: true,
                runs: 100
            }
        }
    }
};

export default config;
