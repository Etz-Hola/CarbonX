// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;

// import "forge-std/Test.sol";
// import "../contracts/core/Diamond.sol";
// import "../contracts/facets/FractionalizerFacet.sol";

// contract FractionalizerTest is Test {
//     Diamond diamond;
//     FractionalizerFacet fractionalizer;

//     function setUp() public {
//         // Deploy Diamond and FractionalizerFacet
//         diamond = new Diamond(address(this), address(0)); // Simplified
//         fractionalizer = new FractionalizerFacet();
//     }

//     function testFractionalize() public {
//         vm.prank(address(this));
//         fractionalizer.fractionalize(1, 10000);
//         assertEq(fractionalizer.getFractionalizedTokens(1), 10000);
//     }
// }