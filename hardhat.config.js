const dotenv = require("dotenv");
require("@nomicfoundation/hardhat-toolbox");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.GOERLI_TESTNET_URL_ENDPOINT,
      accounts: [process.env.GOERLI_WALLET_PRIVATE_KEY],
    },
    hardhat: {
      mining: {
        auto: true,
        interval: 5000,
      },
    },
  },
  etherscan: {
    apiKey: process.env.GOERLI_ETHERSCAN_KEY,
  },
};
