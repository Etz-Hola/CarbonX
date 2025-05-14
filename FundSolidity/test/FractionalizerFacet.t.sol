// SPDX-License-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Diamond} from "../src/core/Diamond.sol";
import {DiamondCutFacet} from "../src/facets/DiamondCutFacet.sol";
import {FractionalizerFacet} from "../src/facets/FractionalizerFacet.sol";
import {IDiamondCut} from "../src/interfaces/IDiamondCut.sol";

/// @title FractionalizerFacet Test Suite
/// @notice Tests fractionalization functionality
contract FractionalizerFacetTest is Test {
    Diamond diamond;
    DiamondCutFacet diamondCutFacet;
    FractionalizerFacet fractionalizerFacet;

    event Fractionalized(uint256 indexed creditId, uint256 amount, address indexed owner);

    function setUp() public {
        // Deploy contracts
        diamondCutFacet = new DiamondCutFacet();
        diamond = new Diamond(address(this), address(diamondCutFacet));
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

    /// @notice Test fractionalizing a carbon credit
    function testFractionalize() public {
        uint256 creditId = 1;
        uint256 amount = 10_000;

        vm.expectEmit(true, true, false, true);
        emit Fractionalized(creditId, amount, address(this));

        vm.prank(address(this));
        FractionalizerFacet(address(diamond)).fractionalize(creditId, amount);

        uint256 tokens = FractionalizerFacet(address(diamond)).getFractionalizedTokens(creditId);
        assertEq(tokens, amount);
        assertEq(FractionalizerFacet(address(diamond)).balanceOf(address(this), creditId), amount);
    }

    /// @notice Test non-owner cannot fractionalize
    function testNonOwnerCannotFractionalize() public {
        vm.prank(address(0x123));
        vm.expectRevert("LibDiamond: Must be contract owner");
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);
    }

    /// @notice Test invalid amount reverts
    function testInvalidAmountReverts() public {
        vm.prank(address(this));
        vm.expectRevert("Fractionalizer: Must create 10,000 tokens");
        FractionalizerFacet(address(diamond)).fractionalize(1, 5000);
    }

    /// @notice Test already fractionalized credit reverts
    function testAlreadyFractionalizedReverts() public {
        vm.prank(address(this));
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);

        vm.prank(address(this));
        vm.expectRevert("Fractionalizer: Already fractionalized");
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);
    }

    /// @notice Test token balance after fractionalization
    function testTokenBalance() public {
        uint256 creditId = 1;
        vm.prank(address(this));
        FractionalizerFacet(address(diamond)).fractionalize(creditId, 10_000);

        assertEq(FractionalizerFacet(address(diamond)).balanceOf(address(this), creditId), 10_000);
        assertEq(FractionalizerFacet(address(diamond)).balanceOf(address(0x123), creditId), 0);
    }
}