// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../utils/Initializable.sol";

abstract contract TamaGucciAccessControlProxi is TammaInitializable {
    /* ========== EVENTS ========== */

    string UNAUTHORIZED; // save gas

    /* ========== STATE VARIABLES ========== */

    mapping(address => bool) public TamaGucciAuthorized;
    mapping(address => bool) public TokenAuthorized;
    mapping(address => bool) public RewardManagerAuthorized;
    

    address public DevWallet;

    /* ========== ContractAddresses ========== */

    address public TokenAddress;
    address public RewardManagerAddress;
    address public TamaGucciAddress;
    

    /* ========== PaymentManagerAddress ========== */
    
    address public Treasury;
    

    /* ========== Constructor ========== */
    function AccessControledProxiableInitialize() public onlyInitializing {
        UNAUTHORIZED = "UNAUTHORIZED";
        DevWallet = msg.sender;
    }
    /* ========== MODIFIERS ========== */

    modifier onlyDevWalletAuthorized(){
        require(msg.sender == DevWallet, UNAUTHORIZED);
        _;
    }
    modifier onlyTamaGucci(){
        require(msg.sender == DevWallet, UNAUTHORIZED);
        _;
    }
    modifier onlyRewardManager(){
        require(msg.sender == RewardManagerAddress, UNAUTHORIZED);
        _;
    }
    
       /* ========== ACCESS SETTERS ========== */
    function setAll(address[] memory _toSet) public onlyDevWalletAuthorized {
        TokenAddress = _toSet[0];
        RewardManagerAddress = _toSet[1];
        TamaGucciAddress = _toSet[2];
    }
}