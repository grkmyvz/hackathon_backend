// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "./EKAPB_COMPETENCE.sol";

contract EKAPB_SUB {
    EKAPB_COMPETENCE competenceContract;

    struct BidderInfo {
        string bidIPFSLink;
        bytes32 offerSha256;
        bytes32 bidderPrivateKey;
        uint256 offer;
    }

    address private creator;

    string private tenderDetail;
    string private tenderPublicKey;

    bool private bidStart;
    bool private bidStop;
    bool private tenderStatus;

    uint256[] competenceIDs;
    address[] bidders;

    // Bidders address to control bool
    mapping(address => bool) bidderControl;

    // Bidder address to info struct
    mapping(address => BidderInfo) biddersInfo;

    // Competence ID to control bool
    mapping(uint256 => bool) competenceControl;

    modifier onlyOwner() {
        require(msg.sender == creator, "Bu yetkiye sahip degilsiniz.");
        _;
    }

    modifier onlyCompetence() {
        bool checkControl;
        for (uint256 i = 0; i < competenceIDs.length; i++) {
            if (
                competenceContract.getCompetence(
                    msg.sender,
                    competenceIDs[i]
                ) == true
            ) {
                checkControl = true;
            }
        }
        require(checkControl == true, "Bu yetkiye sahip degilsiniz.");
        _;
    }

    constructor(
        string memory _tenderDetail,
        string memory _tenderPublicKey,
        uint256[] memory _competenceIDs,
        address _competenceAddress,
        address _creator
    ) {
        tenderDetail = _tenderDetail;
        tenderPublicKey = _tenderPublicKey;
        for (uint256 i; i < _competenceIDs.length; i++) {
            competenceIDs.push(_competenceIDs[i]);
            competenceControl[i] = true;
        }
        competenceContract = EKAPB_COMPETENCE(_competenceAddress);
        creator = _creator;
    }

    function getTenderDetail() public view returns (string memory) {
        return tenderDetail;
    }

    function getTenderPublicKey() public view returns (string memory) {
        return tenderPublicKey;
    }

    function getTenderStatus() public view returns (bool) {
        return tenderStatus;
    }

    function getCompetenceCount() public view returns (uint256) {
        return competenceIDs.length;
    }

    function getCompetenceID(uint256 _index) public view returns (uint256) {
        return competenceIDs[_index];
    }

    function getBidderCount() public view returns (uint256) {
        return bidders.length;
    }

    function getBidder(uint256 _index) public view returns (address) {
        return bidders[_index];
    }

    function getBidderControl(address _address) public view returns (bool) {
        return bidderControl[_address];
    }

    function getBidderInfo(address _address)
        public
        view
        returns (BidderInfo memory)
    {
        return biddersInfo[_address];
    }

    function getCompetenceControl(uint256 _competenceID)
        public
        view
        returns (bool)
    {
        return competenceControl[_competenceID];
    }

    function setBidStart() public onlyOwner() {
        bidStart = true;
    }

    function setBidStop() public onlyOwner() {
        bidStop = true;
    }

    function setOffer(string memory _bidIPFSLink, bytes32 _offerSha256)
        public
        onlyCompetence
    {
        require(bidStart, "Ihaleye teklif verme suan kapali.");
        require(!bidStop, "Ihaleye teklif verme kapatildi.");
        require(bidderControl[msg.sender], "Bu ihaleye zaten teklif verdiniz.");
        BidderInfo memory bidderInfo;
        bidderInfo.bidIPFSLink = _bidIPFSLink;
        bidderInfo.offerSha256 = _offerSha256;
        biddersInfo[msg.sender] = bidderInfo;
        bidders.push(msg.sender);
        bidderControl[msg.sender] = true;
    }

    function openOffer(bytes32 _bidderPrivateKey, uint256 _offer) public {
        require(bidStop, "Henuz gizli anahtarinizi ve teklifinizi aciklayamazsiniz.");
        require(biddersInfo[msg.sender].offer > 0 && biddersInfo[msg.sender].bidderPrivateKey != 0x0000000000000000000000000000000000000000000000000000000000000000, "Bu islemi daha onceden yaptiniz.");
        require(bidderControl[msg.sender], "Bu ihaleye teklif yapmadiniz.");
        BidderInfo storage bidderInfo = biddersInfo[msg.sender];
        bidderInfo.bidderPrivateKey = _bidderPrivateKey;
        bidderInfo.offer = _offer;
    }
}
