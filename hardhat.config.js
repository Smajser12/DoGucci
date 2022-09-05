require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-waffle");
require('hardhat-ethernal');
require('@openzeppelin/hardhat-upgrades');


module.exports = {
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 5000
      }

    },
    dogetest: {
      url: 'https://rpc-testnet.dogechain.dog',
      chainId: 568,
      accounts: [process.env.FUJI_ACCOUNT]
    },
    dogechain:{
      url: 'https://rpc.dogechain.dog',
      accounts: [process.env.FUJI_ACCOUNT]
    }
  },

  ethernal:{
    disableSync: false, // If set to true, plugin will not sync blocks & txs
    disableTrace: false, // If set to true, plugin won't trace transaction
    workspace: "LocalHardHat", // Set the workspace to use, will default to the default workspace (latest one used in the dashboard). It is also possible to set it through the ETHERNAL_WORKSPACE env variable
    
    uploadAst: true, // If set to true, plugin will upload AST, and you'll be able to use the storage feature (longer sync time though)
    disabled: false, // If set to true, the plugin will be disabled, nohting will be synced, ethernal.push won't do anything either
    resetOnStart: "LocalHardHat" // Pass a workspace name to reset it automatically when restarting the node, note that if the workspace doesn't exist it won't error
  },

  solidity: {
    compilers :[
    {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  {
    version: "0.8.14",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
  ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  ethernal: {
    email: process.env.ETHERNAL_EMAIL,
    password: process.env.ETHERNAL_PASSWORD,
    }
}
