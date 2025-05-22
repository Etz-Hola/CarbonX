// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC721} from "../interfaces/IERC721.sol";
import {IERC6551Registry} from "../interfaces/IERC6551Registry.sol";
import {AppStorage} from "../libraries/AppStorage.sol";

contract FractionalizerFacet is ERC1155, AccessControl, Pausable, ReentrancyGuard {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant REGISTRY_ROLE = keccak256("REGISTRY_ROLE");
    AppStorage internal s;

    address public immutable carbonCreditNFT;
    address public immutable eip6551Registry;
    address public immutable eip6551AccountImpl;

    event Fractionalized(uint256 indexed creditId, uint256 amount, address indexed owner);
    event Paused(address account);
    event Unpaused(address account);

    constructor(
        address _carbonCreditNFT,
        address _eip6551Registry,
        address _eip6551AccountImpl
    ) ERC1155("ipfs://carbonx.io/metadata/{id}.json") {
        // Set up roles and immutable addresses
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(REGISTRY_ROLE, msg.sender);
        carbonCreditNFT = _carbonCreditNFT;
        eip6551Registry = _eip6551Registry;
        eip6551AccountImpl = _eip6551AccountImpl;
    }

    modifier orRole(bytes32 role) {
        // Allow MINTER_ROLE or specified role
        require(
            hasRole(role, msg.sender) || hasRole(MINTER_ROLE, msg.sender),
            "AccessControl: missing role"
        );
        _;
    }

    function fractionalize(uint256 creditId, uint256 amount)
        external
        whenNotPaused
        nonReentrant
        orRole(REGISTRY_ROLE)
    {
        // Validate inputs and ownership
        require(amount == 10_000, "Fractionalizer: Must create 10,000 tokens");
        require(creditId != 0, "Fractionalizer: Invalid credit ID");
        require(!s.fractionalized[creditId], "Fractionalizer: Already fractionalized");
        require(
            IERC721(carbonCreditNFT).ownerOf(creditId) == msg.sender,
            "Fractionalizer: Not credit owner"
        );

        // Mint ERC-1155 tokens
        _mint(msg.sender, creditId, amount, "");
        s.carbonTokens[creditId] = uint128(amount);
        s.fractionalized[creditId] = 1;

        // Create EIP-6551 token-bound account
        IERC6551Registry(eip6551Registry).createAccount(
            eip6551AccountImpl,
            block.chainid,
            address(this),
            creditId,
            0,
            ""
        );

        emit Fractionalized(creditId, amount, msg.sender);
    }

    function getFractionalizedTokens(uint256 creditId) external view returns (uint256) {
        // Return token amount for credit
        return s.carbonTokens[creditId];
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        // Pause fractionalization
        _pause();
        emit Paused(msg.sender);
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        // Unpause fractionalization
        _unpause();
        emit Unpaused(msg.sender);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        // Support ERC1155 and AccessControl interfaces
        return super.supportsInterface(interfaceId);
    }
}