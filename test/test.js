const { expect } = require('chai');
const { ethers } = require('hardhat');
//const sha256 = require('js-sha256').sha256;
const provider = ethers.provider;

describe("Test hesaplarının oluşturulması", function () {

    let devlet, kamuKurumu1, kamuKurumu2, kamuKurumu3, firma1, firma2, firma3, misafir1, misafir2;
    let competenceC;

    before(async function() {
        [devlet, kamuKurumu1, kamuKurumu2, kamuKurumu3, firma1, firma2, firma3, misafir1, misafir2] = await ethers.getSigners();

        competenceContract = await ethers.getContractFactory("EKAPB_COMPETENCE");
        competenceC = await competenceContract.connect(devlet).deploy();
        
    });

    it("Hesapların ve kontratların oluşturulup oluşturulmadığı kontrolü", async function() {
        expect(devlet.address).to.not.be.undefined;
        expect(kamuKurumu1.address).to.not.be.undefined;
        expect(kamuKurumu2.address).to.not.be.undefined;
        expect(kamuKurumu3.address).to.not.be.undefined;
        expect(firma1.address).to.not.be.undefined;
        expect(firma2.address).to.not.be.undefined;
        expect(firma3.address).to.not.be.undefined;
        expect(misafir1.address).to.not.be.undefined;
        expect(misafir2.address).to.not.be.undefined;

        expect(competenceC.address).to.not.be.undefined;
    });

    describe("Yetkinlik kontratı testleri", function() {

        it("getCompetence", async function() {
            console.log("firma1 kullanıcısının '123' numaralı yetkinliği var mı? ==> " + await competenceC.connect(misafir1).getCompetence(firma1.address, 123));
        });

        it("setCompetence", async function() {
            await competenceC.connect(devlet).setCompetence(firma1.address, 123);
        });

        it("getCompetence", async function() {
            console.log("firma1 kullanıcısının '123' numaralı yetkinliği var mı? ==> " + await competenceC.connect(misafir1).getCompetence(firma1.address, 123));
        });

    });


});