// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Diamond} from "src/core/Diamond.sol";
import {DiamondCutFacet} from "src/facets/DiamondCutFacet.sol";
import {YieldEngineFacet} from "src/facets/YieldEngineFacet.sol";
import {FractionalizerFacet} from "src/facets/FractionalizerFacet.sol";
import {IDiamondCut} from "src/interfaces/IDiamondCut.sol";
import {IERC721} from "src/interfaces/IERC721.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/interfaces/AggregatorV3Interface.sol";

contract YieldEngineFacetTest is Test {
    Diamond diamond;
    DiamondCutFacet diamondCutFacet;
    FractionalizerFacet fractionalizerFacet;
    YieldEngineFacet yieldEngineFacet;
    address dataFeed = address(0x456); // Mock Chainlink feed

    event YieldUpdated(uint256 indexed creditId, uint256 yield);
    event Paused(address account);
    event Unpaused(address account);

    function setUp() public {
        // Deploy contracts
        diamondCutFacet = new DiamondCutFacet();
        diamond = new Diamond(address(this), address(diamondCutFacet));
        fractionalizerFacet = new FractionalizerFacet(address(0), address(0), address(0));
        yieldEngineFacet = new YieldEngineFacet(dataFeed);

        // Register facets
        IDiamondCut.FacetCut[] memory cut = new IDiamondCut.FacetCut[](2);
        bytes4[] memory fractionalizerSelectors = new bytes4[](4);
        fractionalizerSelectors[0] = FractionalizerFacet.fractionalize.selector;
        fractionalizerSelectors[1] = FractionalizerFacet.getFractionalizedTokens.selector;
        fractionalizerSelectors[2] = FractionalizerFacet.pause.selector;
        fractionalizerSelectors[3] = FractionalizerFacet.unpause.selector;

        cut[0] = IDiamondCut.FacetCut({
            facetAddress: address(fractionalizerFacet),
            action: IDiamondCut.FacetAction.Add,
            functionSelectors: fractionalizerSelectors
        });

        bytes4[] memory yieldSelectors = new bytes4[](4);
        yieldSelectors[0] = YieldEngineFacet.updateYield.selector;
        yieldSelectors[1] = YieldEngineFacet.getYield.selector;
        yieldSelectors[2] = YieldEngineFacet.pause.selector;
        yieldSelectors[3] = YieldEngineFacet.unpause.selector;

        cut[1] = IDiamondCut.FacetCut({
            facetAddress: address(yieldEngineFacet),
            action: IDiamondCut.FacetAction.Add,
            functionSelectors: yieldSelectors
        });

        IDiamondCut(address(diamond)).diamondCut(cut, address(0), "");

        // Fractionalize a credit
        vm.mockCall(
            address(0),
            abi.encodeWithSelector(IERC721.ownerOf.selector, 1),
            abi.encode(address(this))
        );
        vm.prank(address(this));
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);
    }

    function testUpdateYield() public {
        // Test yield update
        vm.mockCall(
            dataFeed,
            abi.encodeWithSelector(AggregatorV3Interface.latestRoundData.selector),
            abi.encode(1, 1000, 0, 0, 0)
        );

        vm.prank(address(this));
        yieldEngineFacet.grantRole(yieldEngineFacet.ORACLE_ROLE(), address(this));

        vm.expectEmit(true, false, false, true);
        emit YieldUpdated(1, 5e18 + 1000 * 1e15);

        vm.prank(address(this));
        YieldEngineFacet(address(diamond)).updateYield(1, 1000);

        assertEq(YieldEngineFacet(address(diamond)).getYield(1), 10_000 + (5e18 + 1000 * 1e15) / 1e18);
    }

    function testNonOracleCannotUpdateYield() public {
        // Test non-oracle reverts
        vm.prank(address(0x123));
        vm.expectRevert("AccessControl: account is missing role");
        YieldEngineFacet(address(diamond)).updateYield(1, 1000);
    }

    function testInvalidCreditIdReverts() public {
        // Test invalid credit ID reverts
        vm.prank(address(this));
        yieldEngineFacet.grantRole(yieldEngineFacet.ORACLE_ROLE(), address(this));

        vm.prank(address(this));
        vm.expectRevert("YieldEngine: Invalid credit ID");
        YieldEngineFacet(address(diamond)).updateYield(0, 1000);
    }

    function testNonFractionalizedReverts() public {
        // Test non-fractionalized credit reverts
        vm.prank(address(this));
        yieldEngineFacet.grantRole(yieldEngineFacet.ORACLE_ROLE(), address(this));

        vm.prank(address(this));
        vm.expectRevert("YieldEngine: Not fractionalized");
        YieldEngineFacet(address(diamond)).updateYield(2, 1000);
    }

    function testPauseYieldUpdate() public {
        // Test pausing yield updates
        vm.prank(address(this));
        vm.expectEmit(true, false, false, true);
        emit Paused(address(this));
        YieldEngineFacet(address(diamond)).pause();

        vm.prank(address(this));
        yieldEngineFacet.grantRole(yieldEngineFacet.ORACLE_ROLE(), address(this));

        vm.prank(address(this));
        vm.expectRevert("Pausable: paused");
        YieldEngineFacet(address(diamond)).updateYield(1, 1000);
    }

    function testUnpauseYieldUpdate() public {
        // Test unpausing yield updates
        vm.prank(address(this));
        YieldEngineFacet(address(diamond)).pause();

        vm.prank(address(this));
        vm.expectEmit(true, false, false, true);
        emit Unpaused(address(this));
        YieldEngineFacet(address(diamond)).unpause();

        vm.prank(address(this));
        yieldEngineFacet.grantRole(yieldEngineFacet.ORACLE_ROLE(), address(this));

        vm.mockCall(
            dataFeed,
            abi.encodeWithSelector(AggregatorV3Interface.latestRoundData.selector),
            abi.encode(1, 1000, 0, 0, 0)
        );

        vm.prank(address(this));
        YieldEngineFacet(address(diamond)).updateYield(1, 1000);
        assertEq(YieldEngineFacet(address(diamond)).getYield(1), 10_000 + (5e18 + 1000 * 1e15) / 1e18);
    }
}