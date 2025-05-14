require("@nomiclabs/hardhat-ethers");
require("@louper/diamond-3-hardhat");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    arbitrumSepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc", // Arbitrum Sepolia testnet
      accounts: [process.env.PRIVATE_KEY], // Add your private key in .env
    },
  },
  diamondAbi: {
    name: "CarbonXDiamond",
    include: ["Facet"],
    exclude: [],
  },
};