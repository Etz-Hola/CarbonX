// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

struct AppStorage {
    mapping(uint256 => uint128) carbonTokens; // creditId => token amount
    mapping(uint256 => uint8) fractionalized;  // creditId => 0 (false) or 1 (true)
}