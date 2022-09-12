// scripts/prepare_upgrade.js
import {TamaGucciRewardManager_ADDRESS} from "./ABI2ReactJS/Export/Constants/Constants.js";

async function main() {
    const proxyAddress = "0xc2B325708a7893d5091dF2793fBF0cbF05932185";
   
    const BoxV2 = await ethers.getContractFactory("TamaGucciRewardManager");
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