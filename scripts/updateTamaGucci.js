
async function main() {
    const proxyAddress = "0x2947782ddc537c7cc52495068758179F5FD56fe1";
   
    const BoxV2 = await ethers.getContractFactory("TamaGucci");
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