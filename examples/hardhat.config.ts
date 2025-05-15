import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    networks: {
        hardhat: {
            gasPrice: 0, // Set gas price to 0
            initialBaseFeePerGas: 0, // Set initial base fee per gas to 0
            mining: {
                auto: false, // Disable automatic mining
                interval: 2000 // Set block interval to 2 seconds (2000ms)
            }
        }
    },
    solidity: {
        version: "0.8.26",
        settings: {
            viaIR: true,
            optimizer: {
                enabled: true,
                runs: 100
            }
        }
    }
};

export default config;
