// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./GucciToken.sol";

contract GucciFaucet is Initializable, OwnableUpgradeable {


    uint256 SupplyLeftToSell;  
    address GucciTokenAddress;
    address uniswapV2Router;


    function initialize() initializer public {
        __Ownable_init();
        SupplyLeftToSell = 20_000_000_000 ether;
        uniswapV2Router = address(0x688d21b0B8Dc35971AF58cFF1F7Bf65639937860);
    }
    
    function buyToken(uint256 _amount) public payable {
        require(_amount > 1000, "Minimum amount is 1000");
        uint256 amount = _amount * 1 ether;
        require(SupplyLeftToSell >= amount, "Not enough supply");
        require(msg.value == getPriceOfAmount(amount), "Wrong value sent");

        SupplyLeftToSell -= amount; // Decrease supply


        uint256 liquidityPart = amount * 80 / 100; // 80% of the amount will be added to liquidity
        addLiqAmount(liquidityPart); // Add liquidity
        payable(owner()).transfer(address(this).balance); // Send the rest to the owner


        ERC20(GucciTokenAddress).transferFrom(address(this), msg.sender, amount); // Transfer the tokens to the buyer
    }

    function addLiqAmount(uint256 _amount) private {
        uint256 ethAmount = getPriceOfAmount(_amount);
        ERC20(GucciTokenAddress).approve(uniswapV2Router, _amount);

        IPangolinRouter(uniswapV2Router).addLiquidityAVAX {value: ethAmount} (
        GucciTokenAddress,
        _amount,
        0,
        0,
        owner(),
        block.timestamp + 100
        );
    }

    function getPriceOfAmount(uint256 _amount) public view returns (uint256){
        return (_amount * 1 ether) / GucciToken(GucciTokenAddress).getPriceOfToken();
    }

    function liquiditySupplyLeft() public view returns (uint256){
        return ERC20(GucciTokenAddress).balanceOf(address(this)) - SupplyLeftToSell;
    }

    function redeemUnsoldToken() public onlyOwner {
        ERC20(GucciTokenAddress).transferFrom(address(this), msg.sender, ERC20(GucciTokenAddress).balanceOf(address(this)));
    }

    function setGucciTokenAddress(address _address) public {
        GucciTokenAddress = _address;
    }



}