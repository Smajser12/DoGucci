// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

abstract contract TamaControl is Initializable, AccessControlUpgradeable {

    bytes32 public constant REWARD_MANAGER_ROLE = keccak256("REWARD_MANAGER_ROLE");
    bytes32 public constant TAMAGUCCI_ROLE = keccak256("TAMAGUCCI_ROLE");
    bytes32 public constant TOKEN_ROLE = keccak256("TOKEN_ROLE");
    bytes32 public constant DEV_ROLE = keccak256("DEV_ROLE");

    address public DevWallet;

    /* ========== ContractAddresses ========== */

    address public TokenAddress;
    address public RewardManagerAddress;
    address public TamaGucciAddress;
    


    function initialize() initializer public {
        __AccessControl_init();
        DevWallet = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setAll(address[] memory _toSet) public onlyRole(DEV_ROLE) {
        TamaGucciAddress = _toSet[0];
        RewardManagerAddress = _toSet[1];
        TokenAddress = _toSet[2];
        _grantRole(TAMAGUCCI_ROLE, _toSet[0]);
        _grantRole(REWARD_MANAGER_ROLE, _toSet[1]);
        _grantRole(TOKEN_ROLE, _toSet[2]);
    }
}
