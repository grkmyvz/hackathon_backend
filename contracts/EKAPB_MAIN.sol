// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "./EKAPB_SUB.sol";

contract EKAPB_MAIN {
    address private creator;
    address private competenceAddress;

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

    function deleteAuthorized(address _address) public onlyOwner {
        authorizedInstitutions[_address] = false;
    }

    function getSubContractCount() public view returns (uint256) {
        return subContracts.length;
    }

    function getSubContract(uint256 _index) public view returns (EKAPB_SUB) {
        return subContracts[_index];
    }

    function getCompetenceAddress() public view returns (address) {
        return competenceAddress;
    }

    function setCompetenceAddress(address _address) public onlyOwner {
        competenceAddress = _address;
    }

    function createTender(
        string memory _tenderDetail,
        string memory _tenderPublicKey,
        uint256[] memory _competenceIDs
    ) public onlyAuthorized {
        EKAPB_SUB account = new EKAPB_SUB(
            _tenderDetail,
            _tenderPublicKey,
            _competenceIDs,
            competenceAddress,
            msg.sender
        );
        subContracts.push(account);
    }
}
