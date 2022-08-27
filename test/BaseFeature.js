const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

describe("DeployTamagucci", function () {
    async function DeployAllContract() {

    const TamaGucci = await ethers.getContractFactory("TamaGucci");
    console.log("Deploying TamaGucciap...");
    const tamagucci = await upgrades.deployProxy(TamaGucci);
    console.log("TamaGucciap deployed to:", tamagucci.address);
    await tamagucci.deployed();

    const TammaGucciRewardManager = await ethers.getContractFactory("TammaGucciRewardManager");
    console.log("Deploying TammaGucciRewardManager...");
    const tammaguccirewardmanager = await upgrades.deployProxy(TammaGucciRewardManager);
    console.log("TammaGucciRewardManager deployed to:", tammaguccirewardmanager.address);
    await tammaguccirewardmanager.deployed();

    const GucciToken = await ethers.getContractFactory("GucciToken");
    const guccitoken = await GucciToken.deploy();
    await guccitoken.deployed();

    const ALLADDRESSES = [guccitoken.address,tammaguccirewardmanager.address,tamagucci.address];


    await (await guccitoken.setAll(ALLADDRESSES)).wait();
    await (await tammaguccirewardmanager.setAll(ALLADDRESSES)).wait();
    await (await tamagucci.setAll(ALLADDRESSES)).wait();




    await (await tamagucci.createTamaGucciType(1,"Doge",69)).wait()
    await (await tamagucci.createTamaGucciType(2,"ChadDoge",100)).wait()
    await (await tamagucci.createTamaGucciType(3,"SnoopDog",420)).wait()
    await (await tamagucci.createTamaGucciType(4,"TopDog",1000)).wait()
    

    await (await tamagucci.createObjectType(1,1000,10)).wait()
    await (await tamagucci.createObjectType(2,1000,10)).wait()
    await (await tamagucci.createObjectType(3,1000,5)).wait()
    await (await tamagucci.createObjectType(4,1000,5)).wait()

    
   


    // function createNodeType(uint256 _type, uint256 _FeedingTime,uint256 _shitTime, uint256 _rewards,uint256 _reductionStarved,uint256 _reductionDirty,uint256 _levelUpPrice,uint256 _feedPrice,uint256 _shitTimeRateLevelUp,uint256 _rewardRateLevelUp,uint256 _feedingTimeRateLevelUp)
    await (await tammaguccirewardmanager.createNodeType(1,360,360,10,50,50,100,10,100,100,100)).wait()
    await (await tammaguccirewardmanager.createNodeType(2,360,360,15,50,50,100,10,100,100,100)).wait()
    await (await tammaguccirewardmanager.createNodeType(3,360,360,20,50,50,100,10,100,100,100)).wait()
    await (await tammaguccirewardmanager.createNodeType(4,360,360,25,50,50,100,10,100,100,100)).wait()  
    }
});