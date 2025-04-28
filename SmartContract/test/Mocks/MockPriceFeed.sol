pragma solidity ^0.8.18;

import "@chainlink/contracts/v0.8/interfaces/AggregatorV3Interface.sol";

/// @dev Minimal mock implementation of a Chainlink price feed.
///      Permet de simuler latestRoundData et de modifier le prix via setPrice.
contract MockPriceFeed is AggregatorV3Interface {
    int256 public price;
    uint8 public override decimals;
    string public override description;
    uint256 public override version;

    constructor(int256 _price) {
        price = _price;
        decimals = 18;
        description = "Mock Price Feed";
        version = 1;
    }

    function latestRoundData() external view override returns (uint80, int256, uint256, uint256, uint80) {
        return (0, price, 0, 0, 0);
    }
    function getRoundData(uint80) external pure override returns (uint80, int256, uint256, uint256, uint80) {
        revert("Not implemented");
    }
    function setPrice(int256 _price) external {
        price = _price;
    }
}