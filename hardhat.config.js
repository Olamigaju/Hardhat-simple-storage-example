const { task } = require("hardhat/config")
require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-Number")
require("hardhat-gas-reporter")
require("solidity-coverage")

//require("@nomicfoundation/hardhat-toolbox")

task("accounts", "Prints list of account", async (tasksArg, hre) => {
    const accounts = await hre.ethers.getSigner()
    for (const account of accounts) {
        console.log(account.address)
    }
})

/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localHot: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.7",
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enable: false,
        outputFile: "'gasReport.txt",
        noColors: true,
        currency: "USD",
        coinmarketCap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
}
