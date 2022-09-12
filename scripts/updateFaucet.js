// scripts/prepare_upgrade.js
// import {TamaGucciRewardManager_ADDRESS} from "./ABI2ReactJS/Export/Constants/Constants.js";

async function main() {
    const proxyAddress = "0x5d4157a7999A04c269261E3057c557fc62f1F14F";
   
    const BoxV2 = await ethers.getContractFactory("GucciFaucet");
    console.log("Preparing upgrade...");
    const boxV2Address = await upgrades.upgradeProxy(proxyAddress, BoxV2);
    console.log("TamaGucciRewardManager at:", boxV2Address);
  }
   
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });