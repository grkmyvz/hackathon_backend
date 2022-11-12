import { ethers } from "hardhat";

async function main() {

    competenceContract = await ethers.getContractFactory("EKAPB_COMPETENCE");
    competenceC = await competenceContract.connect(devlet).deploy();
    await competenceC.deployed();

    mainContract = await ethers.getContractFactory("EKAPB_MAIN");
    mainC = await mainContract.connect(devlet).deploy();
    await mainC.deployed();

    subContract = await ethers.getContractFactory("EKAPB_SUB");

    console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
