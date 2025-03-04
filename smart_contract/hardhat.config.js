require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_API_URL, ALCHEMY_API_KEY, ETH_ADDRESS_PRIVATE_KEY} = process.env;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "sepolia",
  networks: {
    sepolia:{
      url:ALCHEMY_API_URL,
      accounts:[ETH_ADDRESS_PRIVATE_KEY],
    },
  },
  etherscan:{
    apiKey:ALCHEMY_API_KEY
  }
};
 