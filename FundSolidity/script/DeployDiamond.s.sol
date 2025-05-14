// SPDX-License-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {Diamond} from "../src/core/Diamond.sol";
import {FractionalizerFacet} from "../src/facets/FractionalizerFacet.sol";
import {IDiamondCut} from "../src/interfaces/IDiamondCut.sol";

contract DeployDiamond is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy DiamondCutFacet (simplified; use louper/diamond-3 in production)
        address diamondCutFacet = address(0); // Placeholder; replace with actual deployment

        // Deploy Diamond
        Diamond diamond = new Diamond(msg.sender, diamondCutFacet);
        console2.log("Diamond deployed at:", address(diamond));

        // Deploy FractionalizerFacet
        FractionalizerFacet fractionalizerFacet = new FractionalizerFacet();
        console2.log("FractionalizerFacet deployed at:", address(fractionalizerFacet));

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
        console2.log("FractionalizerFacet registered");

        vm.stopBroadcast();
    }
}