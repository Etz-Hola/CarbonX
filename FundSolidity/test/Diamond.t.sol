// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Diamond} from "../src/core/Diamond.sol";
import {DiamondCutFacet} from "../src/facets/DiamondCutFacet.sol";
import {LibDiamond} from "../src/libraries/LibDiamond.sol";

contract DiamondTest is Test {
    Diamond diamond;
    DiamondCutFacet diamondCutFacet;

    function setUp() public {
        diamondCutFacet = new DiamondCutFacet();
        diamond = new Diamond(address(this), address(diamondCutFacet));
    }

    function testContractOwner() public {
        assertEq(LibDiamond.diamondStorage().contractOwner, address(this));
    }

    function testFallbackRevertsForUnknownFunction() public {
        (bool success, ) = address(diamond).call(abi.encodeWithSignature("unknownFunction()"));
        assertFalse(success);
    }
}