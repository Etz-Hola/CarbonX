// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract YieldEngineFacet is AccessControl, Pausable {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    
    struct Storage {
        mapping(uint256 => uint256) carbonTokens;
        mapping(uint256 => bool) fractionalized;
    }
    
    Storage internal s;

    AggregatorV3Interface public dataFeed;
    uint256 public constant BASE_YIELD = 5e18; // 5% APY in wei

    event YieldUpdated(uint256 indexed creditId, uint256 yield);
    event Paused(address account);
    event Unpaused(address account);

    constructor(address _dataFeed) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ORACLE_ROLE, msg.sender);
        dataFeed = AggregatorV3Interface(_dataFeed);
    }

    function initialize(address admin) external {
        require(getRoleMemberCount(DEFAULT_ADMIN_ROLE) == 0, "Already initialized");
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(ORACLE_ROLE, admin);
    }

    function updateYield(uint256 creditId, uint256 co2Sequestration)
        external
        whenNotPaused
        onlyRole(ORACLE_ROLE)
    {
        require(creditId != 0, "Invalid credit ID");
        require(s.fractionalized[creditId], "Not fractionalized");

        (, int256 co2Data, , , ) = dataFeed.latestRoundData();
        require(co2Data >= 0, "Invalid oracle data");

        uint256 yield = BASE_YIELD + (co2Sequestration * 1e15);
        s.carbonTokens[creditId] += yield / 1e18;

        emit YieldUpdated(creditId, yield);
    }

    function getYield(uint256 creditId) external view returns (uint256) {
        return s.carbonTokens[creditId];
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}