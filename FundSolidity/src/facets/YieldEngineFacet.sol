// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/interfaces/AggregatorV3Interface.sol";
import {AppStorage} from "src/libraries/AppStorage.sol";

contract YieldEngineFacet is AccessControl, Pausable {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    AppStorage internal s;

    AggregatorV3Interface public dataFeed;
    uint256 public constant BASE_YIELD = 5e18; // 5% APY in wei

    event YieldUpdated(uint256 indexed creditId, uint256 yield);
    event Paused(address account);
    event Unpaused(address account);

    constructor(address _dataFeed) {
        // Set up roles and data feed
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ORACLE_ROLE, msg.sender);
        dataFeed = AggregatorV3Interface(_dataFeed);
    }

    function updateYield(uint256 creditId, uint256 co2Sequestration)
        external
        whenNotPaused
        onlyRole(ORACLE_ROLE)
    {
        // Validate inputs
        require(creditId != 0, "YieldEngine: Invalid credit ID");
        require(s.fractionalized[creditId] == 1, "YieldEngine: Not fractionalized");

        // Get latest CO2 data from Chainlink (mocked in MVP)
        (, int256 co2Data, , , ) = dataFeed.latestRoundData();
        require(co2Data >= 0, "YieldEngine: Invalid oracle data");

        // Calculate yield: Base + (CO2 sequestration * 0.1%)
        uint256 yield = BASE_YIELD + (co2Sequestration * 1e15); // 0.1% per ton
        s.carbonTokens[creditId] += uint128(yield / 1e18); // Adjust token supply

        emit YieldUpdated(creditId, yield);
    }

    function getYield(uint256 creditId) external view returns (uint256) {
        // Return current yield for credit
        return s.carbonTokens[creditId];
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        // Pause yield updates
        _pause();
        emit Paused(msg.sender);
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        // Unpause yield updates
        _unpause();
        emit Unpaused(msg.sender);
    }

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