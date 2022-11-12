const { expect } = require('chai');
const { ethers } = require('hardhat');
//const sha256 = require('js-sha256').sha256;
const provider = ethers.provider;

describe("Test hesaplarının oluşturulması", function () {

    let devlet, kamuKurumu1, kamuKurumu2, kamuKurumu3, firma1, firma2, firma3, misafir1, misafir2;

    before("Hesapların oluşturulması, kontratların deploy edilmesi", async function () {
        [devlet, kamuKurumu1, kamuKurumu2, kamuKurumu3, firma1, firma2, firma3, misafir1, misafir2] = await ethers.getSigners();

        competenceContract = await ethers.getContractFactory("EKAPB_COMPETENCE");
        competenceC = await competenceContract.connect(devlet).deploy();

        mainContract = await ethers.getContractFactory("EKAPB_MAIN");
        mainC = await mainContract.connect(devlet).deploy();

        subContract = await ethers.getContractFactory("EKAPB_SUB");

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

    describe("Ana kontrat testleri", function () {

        it("getAuthorized (Alt kontrat oluşturabilme yetkinliği sorgulama)", async function () {
            console.log("kamuKurumu1 ihale oluşturabilir mi? ==> " + await mainC.connect(misafir1).getAuthorized(kamuKurumu1.address));
        });

        it("setAuthorized (Alt kontrat oluşturabilme yetkinliği ekleme)", async function () {
            await mainC.connect(devlet).setAuthorized(kamuKurumu1.address);
        });

        it("getAuthorized (Alt kontrat oluşturabilme yetkinliği sorgulama)", async function () {
            console.log("kamuKurumu1 ihale oluşturabilir mi? ==> " + await mainC.connect(misafir1).getAuthorized(kamuKurumu1.address));
        });

        it("createTender (Alt kontrat oluşturma)", async function () {
            tenderDetail = "bafkreiaxvkt7kpqik64b2mugrzkhagpa6npz5lbutnrntehd2mmrfvnyum"
            tenderPublicKey = "vFwh6VQipA"
            await mainC.connect(kamuKurumu1).createTender(tenderDetail, tenderPublicKey, [123, 456, 789], competenceC.address);
        });

        it("getSubContract (Alt kontrat adresi sorgulama)", async function () {
            lastSubContractAddress = await mainC.connect(misafir1).getSubContract(0);
            console.log("Alt kontat adress bilgisi ==> " + lastSubContractAddress);
        });

    });

    describe("Alt kontrat testleri", function () {

        before("Alt kontrata bağlanma", async function () {
            subC = await subContract.attach(lastSubContractAddress);
        });

        it("getTenderDetail (Alt kontrat detay linkini sorgulama)", async function () {
            console.log("Alt kontrat detay IPFS linki ==> " + await subC.connect(misafir1).getTenderDetail());
        });

        it("getTenderPublicKey (Alt kontrat public key sorgulama)", async function () {
            console.log("Alt kontrat public key ==> " + await subC.connect(misafir1).getTenderPublicKey());
        });

        it("getTenderStatus (Alt kontrat durumunu sorgulama)", async function () {
            console.log("Alt kontrat durumu ==> " + await subC.connect(misafir1).getTenderStatus());
        });

        it("getCompetenceCount (Alt kontrat teklif verebilecek yetkinlik sayısı sorgulama)", async function () {
            competenceCount = await subC.connect(misafir1).getCompetenceCount();
            console.log("Alt kontrat teklif verebilecek yetkinlik sayısı ==> " + competenceCount);
        });

        it("getCompetenceID (Alt kontrat teklif verebilecek yetkinlik idlerini sorgulama)", async function () {
            competenceIDs = [];
            for (i = 0; i < Number(competenceCount); i++) {
                competenceID = await subC.connect(misafir1).getCompetenceID(i);
                competenceIDs.push(competenceID);
            }
            console.log("Alt kontrat teklif verebilecek yetkinlik idleri ==> " + competenceIDs);
        });

        it("getBidderCount (Alt kontrat teklif veren sayısı sorgulama)", async function () {
            bidderCount = await subC.connect(misafir1).getBidderCount();
            console.log("Alt kontrat teklif veren sayısı ==> " + bidderCount);
        });

        it("setOffer (Alt kontrat teklif verme)", async function () {
            bidIPFSLink = "bafkreicjmxc2drbgxtoidx6xfatbffyx46oiyo6ktipss6dhdermwtsoze"
            bidderPrivateKey = "J4J0kifK1k";
            bidderOffer = 12500;
            createBytes32 = ethers.utils.formatBytes32String(tenderPublicKey + bidderPrivateKey + bidderOffer);
            createSha256 = ethers.utils.sha256(createBytes32);
            await subC.connect(firma1).setOffer(bidIPFSLink, createSha256);
        });
        
        it("getBidderInfo (Alt kontrat teklif verenin teklif bilgisi sorgulama)", async function() {
            console.log("Alt kontrat teklif veren sayısı ==> " + await subC.connect(misafir1).getBidderInfo(firma1.address));
        });
    
    });


});