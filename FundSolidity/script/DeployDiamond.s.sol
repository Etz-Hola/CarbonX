// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {Console2} from "forge-std/console2.sol";
import {Diamond} from "src/core/Diamond.sol";
import {DiamondCutFacet} from "src/facets/DiamondCutFacet.sol";
import {FractionalizerFacet} from "src/facets/FractionalizerFacet.sol";
import {YieldEngineFacet} from "src/facets/YieldEngineFacet.sol";
import {IDiamondCut} from "src/interfaces/IDiamondCut.sol";

contract DeployDiamond is Script {
    function run() external {
        // Start deployment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy DiamondCutFacet
        DiamondCutFacet diamondCutFacet = new DiamondCutFacet();
        Console2.log("DiamondCutFacet deployed at:", address(diamondCutFacet));

        // Deploy Diamond
        Diamond diamond = new Diamond(msg.sender, address(diamondCutFacet));
        Console2.log("Diamond deployed at:", address(diamond));

        // Deploy FractionalizerFacet
        address carbonCreditNFT = vm.envAddress("CARBON_CREDIT_NFT");
        address eip6551Registry = vm.envAddress("EIP6551_REGISTRY");
        address eip6551AccountImpl = vm.envAddress("EIP6551_ACCOUNT_IMPL");
        FractionalizerFacet fractionalizerFacet = new FractionalizerFacet(
            carbonCreditNFT,
            eip6551Registry,
            eip6551AccountImpl
        );
        Console2.log("FractionalizerFacet deployed at:", address(fractionalizerFacet));

        // Deploy YieldEngineFacet
        address dataFeed = address(0); // Replace with Chainlink feed address
        YieldEngineFacet yieldEngineFacet = new YieldEngineFacet(dataFeed);
        Console2.log("YieldEngineFacet deployed at:", address(yieldEngineFacet));

        // Register facets
        IDiamondCut.FacetCut[] memory cut = new IDiamondCut.FacetCut[](2);
        
        // FractionalizerFacet selectors
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

        // YieldEngineFacet selectors
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
        Console2.log("Facets registered");

        vm.stopBroadcast();
    }
}