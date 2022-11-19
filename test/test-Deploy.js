const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

// A describe function takes a name and a function and the function has a beforeeach and it function in it
describe("simpleStorage", function () {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("should return an update value of zero", async function () {
        const currentFNumber = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentFNumber.toString(), expectedValue)
    })
    it("Should return a store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const updateValue = await simpleStorage.retrieve()
        assert.equal(updateValue.toString(), expectedValue)
    })
})
