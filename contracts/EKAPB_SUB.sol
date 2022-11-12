// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "./EKAPB_COMPETENCE.sol";

contract EKAPB_SUB {

    struct BidderInfo {
        bytes32 bidIPFSLink;
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
    mapping(address => BidderInfo) bidderInfo;

    // Competence ID to control bool
    mapping(uint256 => bool) competenceControl;

    modifier onlyOwner() {
        require(msg.sender == creator, "Bu yetkiye sahip degilsiniz.");
        _;
    }

    constructor(string memory _tenderDetail, string memory _tenderPublicKey, uint256[] memory _competenceIDs) {
        tenderDetail = _tenderDetail;
        tenderPublicKey = _tenderPublicKey;
        for(uint256 i; i < _competenceIDs.length; i++) {
            competenceIDs.push(_competenceIDs[i]);
            competenceControl[i] = true;
        }
        creator = msg.sender;
    }

    function getTenderDetail() public view returns(string memory) {
        return tenderDetail;
    }

    function getTenderPublicKey() public view returns(string memory) {
        return tenderPublicKey;
    }

    function getTenderStatus() public view returns(bool) {
        return tenderStatus;
    }

    function getCompetenceCount() public view returns(uint256) {
        return competenceIDs.length;
    }
    
    function getCompetenceID(uint256 _index) public view returns(uint256) {
        return competenceIDs[_index];
    }

    function getBidderCount() public view returns(uint256) {
        return bidders.length;
    }

    function getBidder(uint256 _index) public view returns(address) {
        return bidders[_index];
    }

    function getBidderControl(address _address) public view returns(bool) {
        return bidderControl[_address];
    }

    function getBidderInfo(address _address) public view returns(BidderInfo memory) {
        return bidderInfo[_address];
    }

    function getCompetenceControl(uint256 _competenceID) public view returns(bool) {
        return competenceControl[_competenceID];
    }
    
}