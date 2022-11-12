// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "./EKAPB_SUB.sol";

contract EKAPB_MAIN {
    address private creator;

    EKAPB_SUB[] subContracts;

    mapping(address => bool) authorizedInstitutions;

    modifier onlyOwner() {
        require(msg.sender == creator, "Bu yetkiye sahip degilsiniz.");
        _;
    }

    modifier onlyAuthorized() {
        require(
            authorizedInstitutions[msg.sender],
            "Bu yetkiye sahip degilsiniz."
        );
        _;
    }

    constructor() {
        creator = msg.sender;
    }

    function getAuthorized(address _address) public view returns (bool) {
        return authorizedInstitutions[_address];
    }

    function setAuthorized(address _address) public onlyOwner {
        authorizedInstitutions[_address] = true;
    }

    function getSubContract(uint256 _index) public view returns (EKAPB_SUB) {
        return subContracts[_index];
    }

    function createTender(
        string memory _tenderDetail,
        string memory _tenderPublicKey,
        uint256[] memory _competenceIDs,
        address _competenceAddress
    ) public onlyAuthorized {
        EKAPB_SUB account = new EKAPB_SUB(
            _tenderDetail,
            _tenderPublicKey,
            _competenceIDs,
            _competenceAddress,
            msg.sender
        );
        subContracts.push(account);
    }
}
