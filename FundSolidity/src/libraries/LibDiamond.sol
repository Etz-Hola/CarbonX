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
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function setContractOwner(address _newOwner) internal {
        DiamondStorage storage ds = diamondStorage();
        ds.contractOwner = _newOwner;
    }

    function enforceIsContractOwner() internal view {
        require(msg.sender == diamondStorage().contractOwner, "LibDiamond: Must be contract owner");
    }

    function diamondCut(IDiamondCut.FacetCut[] memory _diamondCut, address _init, bytes memory _calldata) internal {
        DiamondStorage storage ds = diamondStorage();
        for (uint256 facetIndex; facetIndex < _diamondCut.length; facetIndex++) {
            IDiamondCut.FacetAction action = _diamondCut[facetIndex].action;
            require(action == IDiamondCut.FacetAction.Add, "LibDiamond: Only Add supported in MVP");

            bytes4[] memory functionSelectors = _diamondCut[facetIndex].functionSelectors;
            address facetAddress = _diamondCut[facetIndex].facetAddress;
            require(facetAddress != address(0), "LibDiamond: Invalid facet address");

            for (uint256 selectorIndex; selectorIndex < functionSelectors.length; selectorIndex++) {
                bytes4 selector = functionSelectors[selectorIndex];
                ds.selectorToFacetAndPosition[selector].facetAddress = facetAddress;
                ds.facetFunctionSelectors[facetAddress][selector] = true;
            }
        }

        emit IDiamondCut.DiamondCut(_diamondCut, _init, _calldata);
    }
}