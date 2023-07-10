const hre =require("hardhat")

async function main(){
 
  const upload=await hre.ethers.deployContract("Upload");

  await upload.waitForDeployment();

  console.log(`Deployed to  ${upload.target}` );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});