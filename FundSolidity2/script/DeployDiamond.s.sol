// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {Diamond} from "src/core/Diamond.sol";
import {DiamondCutFacet} from "src/facets/DiamondCutFacet.sol";
import {FractionalizerFacet} from "src/facets/FractionalizerFacet.sol";
import {YieldEngineFacet} from "src/facets/YieldEngineFacet.sol";
import {IDiamondCut} from "src/interfaces/IDiamondCut.sol";

contract DeployDiamond is Script {
    // Constants for gas estimation
    uint256 constant DIAMOND_DEPLOY_GAS = 3_000_000;
    uint256 constant FACET_DEPLOY_GAS = 2_000_000;
    uint256 constant DIAMOND_CUT_GAS = 1_000_000;

    function run() external {
        // Load environment variables with validation
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address carbonCreditNFT = vm.envAddress("CARBON_CREDIT_NFT");
        address eip6551Registry = vm.envAddress("EIP6551_REGISTRY");
        address eip6551AccountImpl = vm.envAddress("EIP6551_ACCOUNT_IMPL");

        // Validate addresses
        require(carbonCreditNFT != address(0), "Invalid CARBON_CREDIT_NFT address");
        require(eip6551Registry != address(0), "Invalid EIP6551_REGISTRY address");
        require(eip6551AccountImpl != address(0), "Invalid EIP6551_ACCOUNT_IMPL address");

        console.log("Starting Diamond deployment...");
        console.log("Deployer: %s", vm.addr(deployerPrivateKey));
        console.log("Carbon Credit NFT: %s", carbonCreditNFT);
        console.log("EIP6551 Registry: %s", eip6551Registry);
        console.log("EIP6551 Account Impl: %s", eip6551AccountImpl);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy DiamondCutFacet
        console.log("\nDeploying DiamondCutFacet...");
        DiamondCutFacet diamondCutFacet = new DiamondCutFacet{gas: FACET_DEPLOY_GAS}();
        console.log("DiamondCutFacet deployed at: %s", address(diamondCutFacet));

        // 2. Deploy Diamond
        console.log("\nDeploying Diamond...");
        Diamond diamond = new Diamond{gas: DIAMOND_DEPLOY_GAS}(
            vm.addr(deployerPrivateKey),
            address(diamondCutFacet)
        );
        console.log("Diamond deployed at: %s", address(diamond));

        // 3. Deploy Implementation Facets
        console.log("\nDeploying Implementation Facets...");
        
        // FractionalizerFacet
        console.log("Deploying FractionalizerFacet...");
        FractionalizerFacet fractionalizerFacet = new FractionalizerFacet{gas: FACET_DEPLOY_GAS}(
            carbonCreditNFT,
            eip6551Registry,
            eip6551AccountImpl
        );
        console.log("FractionalizerFacet deployed at: %s", address(fractionalizerFacet));

        // YieldEngineFacet
        console.log("Deploying YieldEngineFacet...");
        YieldEngineFacet yieldEngineFacet = new YieldEngineFacet{gas: FACET_DEPLOY_GAS}(
            address(0) // Will be set via governance
        );
        console.log("YieldEngineFacet deployed at: %s", address(yieldEngineFacet));

        // 4. Prepare Diamond Cut
        console.log("\nPreparing Diamond Cut...");
        IDiamondCut.FacetCut[] memory cut = new IDiamondCut.FacetCut[](2);
        
        // FractionalizerFacet functions
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

        // YieldEngineFacet functions
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

        // 5. Execute Diamond Cut
        console.log("Executing Diamond Cut...");
        IDiamondCut(address(diamond)).diamondCut{gas: DIAMOND_CUT_GAS}(
            cut,
            address(0),
            ""
        );
        console.log("Diamond Cut completed successfully!");

        vm.stopBroadcast();

        // Output verification commands
        console.log("\nVerification commands:");
        console.log("forge verify-contract --chain-id %s %s src/core/Diamond.sol:Diamond", 
            block.chainid, address(diamond));
        console.log("forge verify-contract --chain-id %s %s src/facets/DiamondCutFacet.sol:DiamondCutFacet",
            block.chainid, address(diamondCutFacet));
        console.log("forge verify-contract --chain-id %s %s src/facets/FractionalizerFacet.sol:FractionalizerFacet",
            block.chainid, address(fractionalizerFacet));
        console.log("forge verify-contract --chain-id %s %s src/facets/YieldEngineFacet.sol:YieldEngineFacet",
            block.chainid, address(yieldEngineFacet));
    }
}