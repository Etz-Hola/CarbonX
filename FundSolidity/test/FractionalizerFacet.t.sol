TARIF// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Diamond} from "src/core/Diamond.sol";
import {DiamondCutFacet} from "src/facets/DiamondCutFacet.sol";
import {FractionalizerFacet} from "src/facets/FractionalizerFacet.sol";
import {IDiamondCut} from "src/interfaces/IDiamondCut.sol";
import {IERC721} from "src/interfaces/IERC721.sol";

contract FractionalizerFacetTest is Test {
    Diamond diamond;
    DiamondCutFacet diamondCutFacet;
    FractionalizerFacet fractionalizerFacet;
    address carbonCreditNFT = address(0x123); // Mock NFT
    address eip6551Registry = address(0x456); // Mock registry
    address eip6551AccountImpl = address(0x789); // Mock implementation

    event Fractionalized(uint256 indexed creditId, uint256 amount, address indexed owner);
    event Paused(address account);
    event Unpaused(address account);

    function setUp() public {
        // Deploy contracts
        diamondCutFacet = new DiamondCutFacet();
        diamond = new Diamond(address(this), address(diamondCutFacet));
        fractionalizerFacet = new FractionalizerFacet(carbonCreditNFT, eip6551Registry, eip6551AccountImpl);

        // Register FractionalizerFacet
        IDiamondCut.FacetCut[] memory cut = new IDiamondCut.FacetCut[](1);
        bytes4[] memory functionSelectors = new bytes4[](4);
        functionSelectors[0] = FractionalizerFacet.fractionalize.selector;
        functionSelectors[1] = FractionalizerFacet.getFractionalizedTokens.selector;
        functionSelectors[2] = FractionalizerFacet.pause.selector;
        functionSelectors[3] = FractionalizerFacet.unpause.selector;

        cut[0] = IDiamondCut.FacetCut({
            facetAddress: address(fractionalizerFacet),
            action: IDiamondCut.FacetAction.Add,
            functionSelectors: functionSelectors
        });

        IDiamondCut(address(diamond)).diamondCut(cut, address(0), "");

        // Mock ERC-721 ownership
        vm.mockCall(
            carbonCreditNFT,
            abi.encodeWithSelector(IERC721.ownerOf.selector, 1),
            abi.encode(address(this))
        );
    }

    function testFractionalize() public {
        // Test successful fractionalization
        uint256 creditId = 1;
        uint256 amount = 10_000;

        vm.expectEmit(true, true, false, true);
        emit Fractionalized(creditId, amount, address(this));

        vm.prank(address(this));
        FractionalizerFacet(address(diamond)).fractionalize(creditId, amount);

        assertEq(FractionalizerFacet(address(diamond)).getFractionalizedTokens(creditId), amount);
        assertEq(FractionalizerFacet(address(diamond)).balanceOf(address(this), creditId), amount);
    }

    function testRegistryRoleFractionalize() public {
        // Test REGISTRY_ROLE can fractionalize
        address registry = address(0xABC);
        vm.prank(address(this));
        fractionalizerFacet.grantRole(fractionalizerFacet.REGISTRY_ROLE(), registry);

        vm.mockCall(
            carbonCreditNFT,
            abi.encodeWithSelector(IERC721.ownerOf.selector, 1),
            abi.encode(registry)
        );

        vm.prank(registry);
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);
        assertEq(FractionalizerFacet(address(diamond)).getFractionalizedTokens(1), 10_000);
    }

    function testNonOwnerCannotFractionalize() public {
        // Test non-owner reverts
        vm.mockCall(
            carbonCreditNFT,
            abi.encodeWithSelector(IERC721.ownerOf.selector, 1),
            abi.encode(address(0x123))
        );
        vm.prank(address(this));
        vm.expectRevert("Fractionalizer: Not credit owner");
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);
    }

    function testInvalidAmountReverts() public {
        // Test invalid amount reverts
        vm.prank(address(this));
        vm.expectRevert("Fractionalizer: Must create 10,000 tokens");
        FractionalizerFacet(address(diamond)).fractionalize(1, 5000);
    }

    function testZeroCreditIdReverts() public {
        // Test zero credit ID reverts
        vm.prank(address(this));
        vm.expectRevert("Fractionalizer: Invalid credit ID");
        FractionalizerFacet(address(diamond)).fractionalize(0, 10_000);
    }

    function testAlreadyFractionalizedReverts() public {
        // Test already fractionalized reverts
        vm.prank(address(this));
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);

        vm.prank(address(this));
        vm.expectRevert("Fractionalizer: Already fractionalized");
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);
    }

    function testPauseFractionalization() public {
        // Test pausing fractionalization
        vm.prank(address(this));
        vm.expectEmit(true, false, false, true);
        emit Paused(address(this));
        FractionalizerFacet(address(diamond)).pause();

        vm.prank(address(this));
        vm.expectRevert("Pausable: paused");
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);
    }

    function testUnpauseFractionalization() public {
        // Test unpausing fractionalization
        vm.prank(address(this));
        FractionalizerFacet(address(diamond)).pause();

        vm.prank(address(this));
        vm.expectEmit(true, false, false, true);
        emit Unpaused(address(this));
        FractionalizerFacet(address(diamond)).unpause();

        vm.prank(address(this));
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);
        assertEq(FractionalizerFacet(address(diamond)).getFractionalizedTokens(1), 10_000);
    }

    function testEIP6551AccountCreation() public {
        // Test EIP-6551 account creation
        vm.mockCall(
            eip6551Registry,
            abi.encodeWithSignature(
                "createAccount(address,uint256,address,uint256,uint256,bytes)",
                eip6551AccountImpl,
                block.chainid,
                address(fractionalizerFacet),
                1,
                0,
                ""
            ),
            abi.encode(address(0xDEF))
        );

        vm.prank(address(this));
        FractionalizerFacet(address(diamond)).fractionalize(1, 10_000);
    }
}