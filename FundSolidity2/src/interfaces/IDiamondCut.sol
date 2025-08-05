// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IDiamondCut {
    enum FacetAction { Add, Replace, Remove }

    struct FacetCut {
        address facetAddress;
        FacetAction action;
        bytes4[] functionSelectors;
    }

    function diamondCut(FacetCut[] calldata _diamondCut, address _init, bytes calldata _calldata) external;

    event DiamondCut(FacetCut[] _diamondCut, address _init, bytes _calldata);
}