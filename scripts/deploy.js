const hre = require("hardhat");
const BuildFiles = require("./ABI2ReactJS/index");

async function main() {

    const TamaGucci = await ethers.getContractFactory("TamaGucci");
    console.log("Deploying TamaGucci...");
    const tamagucci = await upgrades.deployProxy(TamaGucci);
    console.log("TamaGucci deployed to:", tamagucci.address);
    await tamagucci.deployed();

    const Tamaguccirewardmanager = await ethers.getContractFactory("TamaGucciRewardManager");
    console.log("Deploying tamaguccirewardmanager...");
    const tamaguccirewardmanager = await upgrades.deployProxy(Tamaguccirewardmanager);
    console.log("tamaguccirewardmanager deployed to:", tamaguccirewardmanager.address);
    await tamaguccirewardmanager.deployed();

    const GucciToken = await ethers.getContractFactory("GucciToken");
    const guccitoken = await GucciToken.deploy();
    await guccitoken.deployed();
    console.log("GucciToken deployed to:", guccitoken.address);

    const ALLADDRESSES = [guccitoken.address,tamaguccirewardmanager.address,tamagucci.address];



    await (await guccitoken.setAll(ALLADDRESSES)).wait();
    await (await tamaguccirewardmanager.setAll(ALLADDRESSES)).wait();
    await (await tamagucci.setAll(ALLADDRESSES)).wait();

    await (await guccitoken.approve(tamagucci.address, "100000000000000000000000"));



    await (await tamagucci.createTamaGucciType(1,"Doge",69)).wait()
    await (await tamagucci.createTamaGucciType(2,"ChadDoge",100)).wait()
    await (await tamagucci.createTamaGucciType(3,"SnoopDog",420)).wait()
    await (await tamagucci.createTamaGucciType(4,"TopDog",1000)).wait()

    // function createNodeType(uint256 _type, uint256 _FeedingTime,uint256 _shitTime, uint256 _rewards,uint256 _reductionStarved,uint256 _reductionDirty,uint256 _feedPrice)

    await (await tamaguccirewardmanager.createNodeType(1,10,10,"100000000000000",25,25,100)).wait()
    await (await tamaguccirewardmanager.createNodeType(2,10,10,"1000000000000000",20,20,150)).wait()
    await (await tamaguccirewardmanager.createNodeType(3,10,10,"10000000000000000",15,15,250)).wait()
    await (await tamaguccirewardmanager.createNodeType(4,10,10,"100000000000000000",10,10,1250)).wait()
    

    await (await tamagucci.createObjectType(1,1000,10)).wait()
    await (await tamagucci.createObjectType(2,1000,10)).wait()
    await (await tamagucci.createObjectType(3,1000,5)).wait()


    const addresses = [
    {"name":"TamaGucciRewardManager", "address":tamaguccirewardmanager.address},
    {"name":"GucciToken", "address":guccitoken.address},
    {"name":"TamaGucci", "address":tamagucci.address},
  ]
  BuildFiles(addresses);

  await hre.ethernal.resetWorkspace("LocalHardHat");

  await hre.ethernal.push({
    name:'TamaGucci',
    address: tamagucci.address,
  });
  await hre.ethernal.push({
    name:'TamaGucciRewardManager',
    address: tamaguccirewardmanager.address,
  });
  await hre.ethernal.push({
    name:'GucciToken',
    address: guccitoken.address,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
