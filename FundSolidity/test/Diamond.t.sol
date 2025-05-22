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
        // Deploy contracts
        diamondCutFacet = new DiamondCutFacet();
        diamond = new Diamond(address(this), address(diamondCutFacet));
    }

    function testContractOwner() public {
        // Verify contract owner
        assertEq(LibDiamond.diamondStorage().contractOwner, address(this));
    }

    function testFallbackRevertsForUnknownFunction() public {
        // Ensure unknown function reverts
        (bool success, ) = address(diamond).call(abi.encodeWithSignature("unknownFunction()"));
        assertFalse(success);
    }

    function testPauseDiamondCut() public {
        // Test pausing upgrades
        DiamondCutFacet(address(diamond)).pause();
        vm.expectRevert("Pausable: paused");
        DiamondCutFacet(address(diamond)).diamondCut(new IDiamondCut.FacetCut[](0), address(0), "");
    }

    function testEmergencyPause() public {
        // Test DAO emergency pause
        DiamondCutFacet(address(diamond)).emergencyPause();
        vm.expectRevert("Pausable: paused");
        DiamondCutFacet(address(diamond)).diamondCut(new IDiamondCut.FacetCut[](0), address(0), "");
    }
}