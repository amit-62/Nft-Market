const { assert, expect } = require("chai");
const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
// const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
const { developmentChains, networkConfig } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
    ?describe.skip
    :describe("NftMarketplace unit test", function(){
        let nftMarketplace, basicNft, deployer, player
        const price = ethers.utils.parseEther("0.1")
        const TOKEN_ID = 0
        beforeEach(async function(){
            deployer = (await getNamedAccounts()).deployer
            // player = (await getNamedAccounts()).player
            const accounts = await ethers.getSigners()
            player = accounts[1]
            await deployments.fixture(["all"])
            nftMarketplace = await ethers.getContract("NftMarketplace")
            basicNft = await ethers.getContract("BasicNft")
            await basicNft.mintNft()
            await basicNft.approve(nftMarketplace.address, TOKEN_ID)
        })

        it("lists and bought nft", async function(){
            await nftMarketplace.listItem(basicNft.address, TOKEN_ID, price)
            const playerConnectedNftMarketplace = nftMarketplace.connect(player)
            await playerConnectedNftMarketplace.buyItem(basicNft.address, TOKEN_ID,{value: price})
            const newOwner = await basicNft.ownerOf(TOKEN_ID)
            const deployerProceeds = await nftMarketplace.getProceeds(deployer)
            assert(newOwner.toString()== player.address)
            assert(deployerProceeds.toString() == price.toString())
        })
    })