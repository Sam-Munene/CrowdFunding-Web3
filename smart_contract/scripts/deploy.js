const hre = require('hardhat');

async function main() {

    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
    const deploy = await CrowdFunding.deploy();

    const contract = await deploy.getAddress();

    console.log(`contract deployed to ${contract}`);
    
}

main()
.then(()=>{process.exit(0)})
.catch((error)=>{
process.exit(1);
console.error(error);
});