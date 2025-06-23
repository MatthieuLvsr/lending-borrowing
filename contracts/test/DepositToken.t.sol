// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Test.sol";
import "../src/DepositToken.sol";
import "../src/ProtocolAccessControl.sol";

contract DepositTokenTest is Test {
    DepositToken depositToken;
    ProtocolAccessControl protocolAccessControl;
    address owner;
    address lendingContract;
    address user;

    function setUp() public {
        owner = address(this);
        lendingContract = address(0x123);
        user = address(0x456);

        // Deploy shared protocol access control
        protocolAccessControl = new ProtocolAccessControl();

        // Deploy DepositToken contract
        depositToken = new DepositToken("Deposit Token", "dTOKEN", address(protocolAccessControl));

        // Grant the lending role to lendingContract in the shared access control
        protocolAccessControl.grantRole(protocolAccessControl.LENDING_ROLE(), lendingContract);
    }

    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = bytes1(uint8(48 + (value % 16)));
            if (uint8(buffer[i]) > 57) {
                buffer[i] = bytes1(uint8(buffer[i]) + 39);
            }
            value /= 16;
        }
        require(value == 0, "Hex length insufficient");
        return string(buffer);
    }

    function testMint() public {
        uint256 mintAmount = 1000 * 1e18;

        // Only lending contract can mint
        vm.startPrank(lendingContract);
        depositToken.mint(user, mintAmount);
        vm.stopPrank();

        // Verify balance
        assertEq(depositToken.balanceOf(user), mintAmount);
    }

    function testMintFailsWithoutRole() public {
        uint256 mintAmount = 1000 * 1e18;

        // Unauthorized user should fail to mint
        vm.startPrank(user);
        vm.expectRevert("AccessControl: caller does not have required role");
        depositToken.mint(user, mintAmount);
        vm.stopPrank();
    }

    function testBurn() public {
        uint256 mintAmount = 1000 * 1e18;
        uint256 burnAmount = 500 * 1e18;

        // Mint tokens to user
        vm.startPrank(lendingContract);
        depositToken.mint(user, mintAmount);
        vm.stopPrank();

        // Verify initial balance
        assertEq(depositToken.balanceOf(user), mintAmount);

        // Burn tokens from user
        vm.startPrank(lendingContract);
        depositToken.burn(user, burnAmount);
        vm.stopPrank();

        // Verify final balance
        assertEq(depositToken.balanceOf(user), mintAmount - burnAmount);
    }

    function testBurnFailsWithoutRole() public {
        uint256 mintAmount = 1000 * 1e18;
        uint256 burnAmount = 500 * 1e18;

        // Mint tokens to user
        vm.startPrank(lendingContract);
        depositToken.mint(user, mintAmount);
        vm.stopPrank();

        // Unauthorized user should fail to burn
        vm.startPrank(user);
        vm.expectRevert("AccessControl: caller does not have required role");
        depositToken.burn(user, burnAmount);
        vm.stopPrank();
    }
}
