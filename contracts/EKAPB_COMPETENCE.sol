// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract EKAPB_COMPETENCE {

    address creator;

    // Address => Competence => True & False
    mapping(address => mapping(uint256 => bool)) competence;

    modifier onlyOwner {
        require(msg.sender == creator, "Bu yetkiye sahip degilsiniz.");
        _;
    }

    constructor() {
        creator = msg.sender;
    }

    function getCompetence(address _address, uint256 _competenceID) public view returns(bool) {
        return competence[_address][_competenceID];
    }

    function setCompetence(address _address, uint256 _competenceID) public onlyOwner {
        competence[_address][_competenceID] = true;
    }
    
}