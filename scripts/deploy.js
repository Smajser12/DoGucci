const hre = require("hardhat");
const BuildFiles = require("./ABI2ReactJS/index");

async function main() {

    const TamaGucci = await ethers.getContractFactory("TamaGucci");
    console.log("Deploying TamaGucciap...");
    const tamagucci = await upgrades.deployProxy(TamaGucci);
    console.log("TamaGucciap deployed to:", tamagucci.address);
    await tamagucci.deployed();

    const Tamaguccirewardmanager = await ethers.getContractFactory("TamaGucciRewardManager");
    console.log("Deploying tamaguccirewardmanager...");
    const tamaguccirewardmanager = await upgrades.deployProxy(Tamaguccirewardmanager);
    console.log("tamaguccirewardmanager deployed to:", tamaguccirewardmanager.address);
    await tamaguccirewardmanager.deployed();

    const GucciToken = await ethers.getContractFactory("GucciToken");
    const guccitoken = await GucciToken.deploy();
    await guccitoken.deployed();

    const ALLADDRESSES = [guccitoken.address,tamaguccirewardmanager.address,tamagucci.address];


    await (await guccitoken.setAll(ALLADDRESSES)).wait();
    await (await tamaguccirewardmanager.setAll(ALLADDRESSES)).wait();
    await (await tamagucci.setAll(ALLADDRESSES)).wait();




    await (await tamagucci.createTamaGucciType(1,"Doge",69)).wait()
    await (await tamagucci.createTamaGucciType(2,"ChadDoge",100)).wait()
    await (await tamagucci.createTamaGucciType(3,"SnoopDog",420)).wait()
    await (await tamagucci.createTamaGucciType(4,"TopDog",1000)).wait()

     // function createNodeType(uint256 _type, uint256 _FeedingTime,uint256 _shitTime, uint256 _rewards,uint256 _reductionStarved,uint256 _reductionDirty,uint256 _levelUpPrice,uint256 _feedPrice,uint256 _shitTimeRateLevelUp,uint256 _rewardRateLevelUp,uint256 _feedingTimeRateLevelUp)

    await (await tamaguccirewardmanager.createNodeType(1,360,360,10,50,50,100,10,100,100,100)).wait()
    await (await tamaguccirewardmanager.createNodeType(2,360,360,15,50,50,100,10,100,100,100)).wait()
    await (await tamaguccirewardmanager.createNodeType(3,360,360,20,50,50,100,10,100,100,100)).wait()
    await (await tamaguccirewardmanager.createNodeType(4,360,360,25,50,50,100,10,100,100,100)).wait()
    

    await (await tamagucci.createObjectType(1,1000,10)).wait()
    await (await tamagucci.createObjectType(2,1000,10)).wait()
    await (await tamagucci.createObjectType(3,1000,5)).wait()
    await (await tamagucci.createObjectType(4,1000,5)).wait()


    const addresses = [
    {"name":"TamaGucciRewardManager", "address":tamaguccirewardmanager.address},
    {"name":"GucciToken", "address":guccitoken.address},
    {"name":"TamaGucci", "address":tamagucci.address},
  ]

  BuildFiles(addresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
