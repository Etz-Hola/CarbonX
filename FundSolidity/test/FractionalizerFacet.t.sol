// SPDX-License-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {FractionalizerFacet} from "../src/facets/FractionalizerFacet.sol";
import {Diamond} from "../src/core/Diamond.sol";
import {IDiamondCut} from "../src/interfaces/IDiamondCut.sol";

contract FractionalizerFacetTest is Test {
    Diamond diamond;
    FractionalizerFacet fractionalizerFacet;

    function setUp() public {
        // Deploy Diamond and FractionalizerFacet
        diamond = new Diamond(address(this), address(0));
        fractionalizerFacet = new FractionalizerFacet();

        // Register FractionalizerFacet
        IDiamondCut.FacetCut[] memory cut = new IDiamondCut.FacetCut[](1);
        bytes4[] memory functionSelectors = new bytes4[](2);
        functionSelectors[0] = FractionalizerFacet.fractionalize.selector;
        functionSelectors[1] = FractionalizerFacet.getFractionalizedTokens.selector;

        cut[0] = IDiamondCut.FacetCut({
            facetAddress: address(fractionalizerFacet),
            action: IDiamondCut.FacetAction.Add,
            functionSelectors: functionSelectors
        });

        IDiamondCut(address(diamond)).diamondCut(cut, address(0), "");
    }

    function testFractionalize() public {
        uint256 creditId = 1;
        uint256 amount = 10_000;

        vm.prank(address(this));
        FractionalizerFacet(address(diamond)).fractionalize(creditId, amount);

        uint256 tokens = FractionalizerFacet(address(diamond)).getFractionalizedTokens(creditId);
        assertEq(tokens, amount);
    }

    function testNonOwnerCannotFractionalize() public {
        vm.prank(address(0x123));
        vm.expectRevert("LibDiamond: Must be contract owner");
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);
    }
}