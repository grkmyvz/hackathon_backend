const { expect } = require('chai');
const { ethers } = require('hardhat');
//const sha256 = require('js-sha256').sha256;
const provider = ethers.provider;

describe("Test hesaplarının oluşturulması", function () {

    it("Adreslerin oluşturulması ve kontrolü", async function() {
        const [devlet, kamuKurumu1, kamuKurumu2, kamuKurumu3, firma1, firma2, firma3, misafir1, misafir2] = await ethers.getSigners();
        expect(devlet.address).to.not.be.undefined;
        expect(kamuKurumu1.address).to.not.be.undefined;
        expect(kamuKurumu2.address).to.not.be.undefined;
        expect(kamuKurumu3.address).to.not.be.undefined;
        expect(firma1.address).to.not.be.undefined;
        expect(firma2.address).to.not.be.undefined;
        expect(firma3.address).to.not.be.undefined;
        expect(misafir1.address).to.not.be.undefined;
        expect(misafir2.address).to.not.be.undefined;
    });

    

});
/*describe("Yetkinlik kontratı", async function() {
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
});*/