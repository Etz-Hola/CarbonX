// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {AppStorage} from "../libraries/AppStorage.sol";
import {LibDiamond} from "../libraries/LibDiamond.sol";

contract FractionalizerFacet is ERC1155 {
    AppStorage internal s;

    event Fractionalized(uint256 indexed creditId, uint256 amount, address indexed owner);

    constructor() ERC1155("https://carbonx.io/metadata/{id}.json") {}

    function fractionalize(uint256 creditId, uint256 amount) external {
        LibDiamond.enforceIsContractOwner();
        require(amount == 10_000, "Fractionalizer: Must create 10,000 tokens");
        require(!s.fractionalized[creditId], "Fractionalizer: Already fractionalized");

        // Mint 10,000 ERC-1155 tokens
        _mint(msg.sender, creditId, amount, "");
        s.carbonTokens[creditId] = amount;
        s.fractionalized[creditId] = true;

        emit Fractionalized(creditId, amount, msg.sender);
    }

    function getFractionalizedTokens(uint256 creditId) external view returns (uint256) {
        return s.carbonTokens[creditId];
    }
}