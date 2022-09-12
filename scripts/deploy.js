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

    // const DogeSale = await ethers.getContractFactory("DogeSale");
    // const dogesale = await DogeSale.deploy(guccitoken.address);
    // await dogesale.deployed();
    // console.log("DogeSale deployed to:", dogesale.address);

    const GucciFaucet = await ethers.getContractFactory("GucciFaucet");
    const guccifaucet = await GucciFaucet.deploy();
    await guccifaucet.deployed();
    console.log("GucciFaucet deployed to:", guccifaucet.address);

    const ALLADDRESSES = [guccitoken.address,tamaguccirewardmanager.address,tamagucci.address];



    await (await guccitoken.setAll(ALLADDRESSES)).wait();
    await (await tamaguccirewardmanager.setAll(ALLADDRESSES)).wait();
    await (await tamagucci.setAll(ALLADDRESSES)).wait();
    await (await guccifaucet.setGucciTokenAddress(guccitoken.address)).wait();

    // await (await guccitoken.approve(tamagucci.address, "100000000000000000000000100000000000000000000000"));
    // await (await guccitoken.approve(dogesale.address, "100000000000000000000000100000000000000000000000"));



    await (await tamagucci.createTamaGucciType(1,"Mametchi",3333)).wait()
    await (await tamagucci.createTamaGucciType(2,"Violetchi",6666)).wait()
    await (await tamagucci.createTamaGucciType(3,"Elon",9999)).wait()
    await (await tamagucci.createTamaGucciType(4,"SnoopDoge",13332)).wait()

    // function createNodeType(uint256 _type, uint256 _FeedingTime,uint256 _shitTime, uint256 _rewards,uint256 _reductionStarved,uint256 _reductionDirty,uint256 _feedPrice)

    

    await (await tamaguccirewardmanager.createNodeType(1,30,100,"694444444444444444",75,75,50)).wait()
    await (await tamaguccirewardmanager.createNodeType(2,30,100,"2395833333333333333",80,80,100)).wait()
    await (await tamaguccirewardmanager.createNodeType(3,30,100,"7716049074070000000",80,80,420)).wait()
    await (await tamaguccirewardmanager.createNodeType(4,30,100,"36736111111111111111",85,85,690)).wait()
    

    await (await tamagucci.createObjectType(1,2000000,10)).wait()
    await (await tamagucci.createObjectType(2,2000000,10)).wait()
    await (await tamagucci.createObjectType(3,4200000,20)).wait()
    await (await tamagucci.createObjectType(4,2000000,10)).wait()


    await (await guccitoken.transfer(guccifaucet.address, "34000000000000000000000000000")).wait();
    await (await guccitoken.transfer(tamagucci.address, "6000000000000000000000000000")).wait();


    const addresses = [
    {"name":"TamaGucciRewardManager", "address":tamaguccirewardmanager.address},
    {"name":"GucciToken", "address":guccitoken.address},
    {"name":"TamaGucci", "address":tamagucci.address},
    {"name":"GucciFaucet", "address":guccifaucet.address}
  ]
  BuildFiles(addresses);

  await hre.ethernal.resetWorkspace("Test");

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
    name:'GucciFaucet',
    address: guccifaucet.address});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
