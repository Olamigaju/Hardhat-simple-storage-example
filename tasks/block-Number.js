const { task } = require("hardhat/config")
// => is known as javascript error function follow by function definetion
task("block-number", "print the current block number").setAction(
    async (taskArg, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`current block Number: ${blockNumber}`)
    }
)
