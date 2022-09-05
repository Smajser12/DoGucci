// scripts/prepare_upgrade.js
async function main() {
    const proxyAddress = '0xce808fd81Aa987AC35eA83b6feF21a5988aBEC3C';
   
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