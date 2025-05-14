// SPDX-License-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Diamond} from "../src/core/Diamond.sol";
import {LibDiamond} from "../src/libraries/LibDiamond.sol";

contract DiamondTest is Test {
    Diamond diamond;

    function setUp() public {
        // Deploy Diamond with placeholder DiamondCutFacet
        diamond = new Diamond(address(this), address(0));
    }

    function testContractOwner() public {
        assertEq(LibDiamond.diamondStorage().contractOwner, address(this));
    }
}