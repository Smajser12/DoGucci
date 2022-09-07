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

    const DogeSale = await ethers.getContractFactory("DogeSale");
    const dogesale = await DogeSale.deploy(guccitoken.address);
    await dogesale.deployed();
    console.log("DogeSale deployed to:", dogesale.address);

    const ALLADDRESSES = [guccitoken.address,tamaguccirewardmanager.address,tamagucci.address];



    await (await guccitoken.setAll(ALLADDRESSES)).wait();
    await (await tamaguccirewardmanager.setAll(ALLADDRESSES)).wait();
    await (await tamagucci.setAll(ALLADDRESSES)).wait();

    await (await guccitoken.approve(tamagucci.address, "100000000000000000000000100000000000000000000000"));
    await (await guccitoken.approve(dogesale.address, "100000000000000000000000100000000000000000000000"));



    await (await tamagucci.createTamaGucciType(1,"Violetchi",69000000)).wait()
    await (await tamagucci.createTamaGucciType(2,"Mametchi",100000000)).wait()
    await (await tamagucci.createTamaGucciType(3,"Elon",420000000)).wait()
    await (await tamagucci.createTamaGucciType(4,"SnoopDoge",1000000000)).wait()

    // function createNodeType(uint256 _type, uint256 _FeedingTime,uint256 _shitTime, uint256 _rewards,uint256 _reductionStarved,uint256 _reductionDirty,uint256 _feedPrice)

    await (await tamaguccirewardmanager.createNodeType(1,30,100,"15972222000000000000",75,75,1)).wait()
    await (await tamaguccirewardmanager.createNodeType(2,30,100,"34722222222222222220",80,80,2)).wait()
    await (await tamaguccirewardmanager.createNodeType(3,30,100,"194444444444444444440",85,85,3)).wait()
    await (await tamaguccirewardmanager.createNodeType(4,30,100,"532400000000000000000",90,90,4)).wait()
    

    await (await tamagucci.createObjectType(1,1000,10)).wait()
    await (await tamagucci.createObjectType(2,1000,10)).wait()
    await (await tamagucci.createObjectType(3,1000,5)).wait()
    await (await tamagucci.createObjectType(4,1000,5)).wait()

    await (await dogesale.depositToken()).wait()


    const addresses = [
    {"name":"TamaGucciRewardManager", "address":tamaguccirewardmanager.address},
    {"name":"GucciToken", "address":guccitoken.address},
    {"name":"TamaGucci", "address":tamagucci.address},
    {"name":"DogeSale", "address":dogesale.address}
  ]
  BuildFiles(addresses);

  // await hre.ethernal.resetWorkspace("LocalHardHat");

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
  await hre.ethernal.push({
    name:'DogeSale',
    address: dogesale.address});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
