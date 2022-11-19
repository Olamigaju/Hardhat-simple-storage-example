//we imort ethers and run from hardhat
const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deploying contract.......")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log(`deploy contract to:${simpleStorage.address}`)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(5)
        await verify(simpleStorage.address, [])
    }

    const currentFNumber = await simpleStorage.retrieve()
    console.log(`currentValue:${currentFNumber}`)
    const transactionResponse = await simpleStorage.store(10)
    await transactionResponse.wait(1)
    const updateValue = await simpleStorage.retrieve()
    console.log(`updatedValue:${updateValue}`)
    // const UpdatePeopleandnumber = await simpleStorage.addPeople("Olawuyi", 11)
    // console.log(`updatepeople:${UpdatePeopleandnumber}`)
}
//the verifyb function takes in two argument contradddress and constructor(only if contructor is present in our smart contract)

async function verify(contractAddress, arg) {
    console.log("verying contract......")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArg: arg,
        })
        // e represent error it throws
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Veriefied!")
        } else {
            console.log(e)
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
// //     console.error(error)
// //     process.exitCode = 1
// })
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
