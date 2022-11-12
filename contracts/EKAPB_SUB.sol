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

    bytes32 private tenderDetail;
    bytes32 private tenderPublicKey;

    bool private bidStart;
    bool private bidStop;

    uint256[] competenceIDs;
    address[] bidders;

    // Bidders address to control bool
    mapping(address => bool) bidderControl;

    // Bidder address to info struct
    mapping(address => BidderInfo) bidderInfo;

    // Competence ID to control bool
    mapping(uint256 => bool) competenceControl;

    constructor(bytes32 _tenderDetail, bytes32 _tenderPublicKey, uint256[] memory _competenceIDs) {
        tenderDetail = _tenderDetail;
        tenderPublicKey = _tenderPublicKey;
        for(uint256 i; i < _competenceIDs.length; i++) {
            competenceIDs.push(_competenceIDs[i]);
            competenceControl[i] = true;
        }
    }
    
}