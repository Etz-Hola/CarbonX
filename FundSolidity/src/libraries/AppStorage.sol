// SPDX-License-License-Identifier: MIT
pragma solidity ^0.8.20;

struct AppStorage {
    mapping(uint256 => uint256) carbonTokens; // creditId => token amount
    mapping(uint256 => bool) fractionalized;   // creditId => isFractionalized
}