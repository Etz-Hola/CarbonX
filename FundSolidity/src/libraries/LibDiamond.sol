// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IDiamondCut} from "../interfaces/IDiamondCut.sol";

library LibDiamond {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage");

    struct FacetAddressAndPosition {
        address facetAddress;
        uint96 functionSelectorPosition;
    }

    struct DiamondStorage {
        mapping(bytes4 => FacetAddressAndPosition) selectorToFacetAndPosition;
        mapping(address => mapping(bytes4 => bool)) facetFunctionSelectors;
        address contractOwner;
    }

    function diamondStorage() internal pure returns (DiamondStorage storage ds) {
        // Get diamond storage slot
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function setContractOwner(address _newOwner) internal {
        // Set contract owner
        DiamondStorage storage ds = diamondStorage();
        ds.contractOwner = _newOwner;
    }

    function enforceIsContractOwner() internal view {
        // Restrict to contract owner
        require(msg.sender == diamondStorage().contractOwner, "LibDiamond: Must be contract owner");
    }

    function diamondCut(IDiamondCut.FacetCut[] memory _diamondCut, address _init, bytes memory _calldata) internal {
        // Update facet mappings
        DiamondStorage storage ds = diamondStorage();
        for (uint256 facetIndex; facetIndex < _diamondCut.length; facetIndex++) {
            IDiamondCut.FacetAction action = _diamondCut[facetIndex].action;
            bytes4[] memory functionSelectors = _diamondCut[facetIndex].functionSelectors;
            address facetAddress = _diamondCut[facetIndex].facetAddress;

            require(facetAddress != address(0), "LibDiamond: Invalid facet address");

            for (uint256 selectorIndex; selectorIndex < functionSelectors.length; selectorIndex++) {
                bytes4 selector = functionSelectors[selectorIndex];
                if (action == IDiamondCut.FacetAction.Add) {
                    require(
                        ds.selectorToFacetAndPosition[selector].facetAddress == address(0),
                        "LibDiamond: Selector already exists"
                    );
                    ds.selectorToFacetAndPosition[selector].facetAddress = facetAddress;
                    ds.facetFunctionSelectors[facetAddress][selector] = true;
                } else if (action == IDiamondCut.FacetAction.Replace) {
                    require(
                        ds.selectorToFacetAndPosition[selector].facetAddress != address(0),
                        "LibDiamond: Selector does not exist"
                    );
                    ds.selectorToFacetAndPosition[selector].facetAddress = facetAddress;
                    ds.facetFunctionSelectors[facetAddress][selector] = true;
                } else if (action == IDiamondCut.FacetAction.Remove) {
                    require(
                        ds.selectorToFacetAndPosition[selector].facetAddress != address(0),
                        "LibDiamond: Selector does not exist"
                    );
                    ds.selectorToFacetAndPosition[selector].facetAddress = address(0);
                    ds.facetFunctionSelectors[facetAddress][selector] = false;
                }
            }
        }

        emit IDiamondCut.DiamondCut(_diamondCut, _init, _calldata);
    }
}