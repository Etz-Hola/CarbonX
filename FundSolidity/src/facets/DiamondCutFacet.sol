// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IDiamondCut} from "../interfaces/IDiamondCut.sol";
import {LibDiamond} from "../libraries/LibDiamond.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract DiamondCutFacet is IDiamondCut, Pausable, AccessControl {
    bytes32 public constant DAO_ROLE = keccak256("DAO_ROLE");

    constructor() {
        // Set up admin role for deployer
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(DAO_ROLE, msg.sender);
    }

    function diamondCut(
        FacetCut[] calldata _diamondCut,
        address _init,
        bytes calldata _calldata
    ) external whenNotPaused onlyRole(DEFAULT_ADMIN_ROLE) {
        // Execute diamond cut to update facets
        LibDiamond.diamondCut(_diamondCut, _init, _calldata);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        // Pause facet upgrades
        _pause();
        emit Paused(msg.sender);
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        // Unpause facet upgrades
        _unpause();
        emit Unpaused(msg.sender);
    }

    function emergencyPause() external onlyRole(DAO_ROLE) {
        // Emergency pause by DAO
        _pause();
        emit Paused(msg.sender);
    }

    event Paused(address account);
    event Unpaused(address account);

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl)
        returns (bool)
    {
        // Support AccessControl interface
        return super.supportsInterface(interfaceId);
    }
}