const { expect } = require('chai');
const { ethers } = require('hardhat');
//const sha256 = require('js-sha256').sha256;
const provider = ethers.provider;

describe("Test hesaplarının oluşturulması", function () {

    let devlet, kamuKurumu1, kamuKurumu2, kamuKurumu3, firma1, firma2, firma3, misafir1, misafir2;
    let competenceC;

    before(async function () {
        [devlet, kamuKurumu1, kamuKurumu2, kamuKurumu3, firma1, firma2, firma3, misafir1, misafir2] = await ethers.getSigners();

        competenceContract = await ethers.getContractFactory("EKAPB_COMPETENCE");
        competenceC = await competenceContract.connect(devlet).deploy();

        mainContract = await ethers.getContractFactory("EKAPB_MAIN");
        mainC = await mainContract.connect(devlet).deploy();

    });

    it("Hesapların ve kontratların oluşturulup oluşturulmadığı kontrolü", async function () {
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

        expect(mainC.address).to.not.be.undefined;
    });

    describe("Yetkinlik kontratı testleri", function () {

        it("getCompetence (Firmanın yetkinliği olan alanlarını sorgulama)", async function () {
            console.log("firma1 kullanıcısının '123' numaralı yetkinliği var mı? ==> " + await competenceC.connect(misafir1).getCompetence(firma1.address, 123));
        });

        it("setCompetence (Firmanın yetkinliği olan alanını ekleme)", async function () {
            await competenceC.connect(devlet).setCompetence(firma1.address, 123);
        });

        it("getCompetence (Firmanın yetkinliği olan alanlarını sorgulama)", async function () {
            console.log("firma1 kullanıcısının '123' numaralı yetkinliği var mı? ==> " + await competenceC.connect(misafir1).getCompetence(firma1.address, 123));
        });

    });

    describe("Ana kontrat testleri", function() {

        it("getAuthorized (Alt kontrat oluşturabilme yetkinliği sorgulama)", async function() {
            console.log("kamuKurumu1 ihale oluşturabilir mi? ==> " + await mainC.connect(misafir1).getAuthorized(kamuKurumu1.address));
        });

        it("setAuthorized (Alt kontrat oluşturabilme yetkinliği ekleme)", async function() {
            await mainC.connect(devlet).setAuthorized(kamuKurumu1.address);
        });

        it("getAuthorized (Alt kontrat oluşturabilme yetkinliği sorgulama)", async function() {
            console.log("kamuKurumu1 ihale oluşturabilir mi? ==> " + await mainC.connect(misafir1).getAuthorized(kamuKurumu1.address));
        });

        it("createTender (Alt kontrat oluşturma)", async function() {
            let tenderDetail = "bafkreiaxvkt7kpqik64b2mugrzkhagpa6npz5lbutnrntehd2mmrfvnyum"
            let tenderPublicKey = "vFwh6VQipA"
            await mainC.connect(kamuKurumu1).createTender(tenderDetail, tenderPublicKey, [123, 456, 789]);
        });

        it("getSubContract (Alt kontrat adresi sorgulama)", async function() {
            console.log("Alt kontat adress bilgisi ==> " + await mainC.connect(misafir1).getSubContract(0));
        });

    });


});