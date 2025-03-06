require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const privateKeys = process.env.PRIVATE_KEYS || "a267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1";
const goerliApiKey = process.env.GOERLI_API_KEY || "https://goerli.infura.io/v3/4ad2a98165ee4f7788a9fa321d43427e";
const mumbaiApiKey = process.env.MUMBAI_API_KEY || "https://polygon-mainnet.infura.io/v3/4ad2a98165ee4f7788a9fa321d43427e";
module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {},
    goerli: {
      url: goerliApiKey,
      accounts: privateKeys.split(","),
    },
    mumbai: {
      url: mumbaiApiKey,
      accounts: privateKeys.split(","),
    },
  },
};
