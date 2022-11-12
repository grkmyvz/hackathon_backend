const { ethers } = require('hardhat');

async function main() {

    competenceContract = await ethers.getContractFactory("EKAPB_COMPETENCE");
    competenceC = await competenceContract.deploy();
    await competenceC.deployed();

    mainContract = await ethers.getContractFactory("EKAPB_MAIN");
    mainC = await mainContract.deploy();
    await mainC.deployed();

    subContract = await ethers.getContractFactory("EKAPB_SUB");

    console.log(`Yetkinlik kontratı : ${competenceC}`);
    console.log(`Ana kontrat : ${mainC}`);
    console.log(`Alt kontrat : ${subContract}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
