// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract DogeSale is Ownable{


    constructor(address _GCC){
        GCC = _GCC;
    }

    uint256 HardCap = 3000000 ether;
    uint256 Supply = 3000000 ether * 6666;
    address GCC;
    bool public withdrawOpen = false;

    // ___Roles___
    mapping(address => bool) public WhiteList;
    

    uint256 public MaxAlloc = 30_000 ether; //In DOGE
    uint256 public TokenByDoge = 6666 ether;

    mapping(address => uint256) public TokenAmount;

    function buyPresale(uint256 _amount) payable public {
        uint256 priceOfAmount = getPriceOfAmount(_amount);
        require(msg.value == priceOfAmount, "Wrong Value sent");
        require(TokenAmount[msg.sender] + _amount <= MaxAlloc, "Full");
        require(Supply > _amount, "Not enough supply");
        
        TokenAmount[msg.sender] += _amount;

        Supply -= _amount;
    }
    function depositToken() public onlyOwner{
        ERC20(GCC).transferFrom(msg.sender, address(this), Supply);
    }

    function claimToken() public {
        require(withdrawOpen, "Withdraw not open");
        uint256 amountOfUser = TokenAmount[msg.sender];
        TokenAmount[msg.sender] = 0;

        ERC20(GCC).transfer(msg.sender, amountOfUser);
    }
    

    function getPriceOfAmount(uint256 _amount) public view returns (uint256){
        return _amount / TokenByDoge;
    }

    function getAmountOfTokenByAmount(uint256 _dogeAmount) public view returns (uint256){
        return _dogeAmount * TokenByDoge;
    }


    function claimPresale() public onlyOwner{
        payable(owner()).transfer(address(this).balance);
    }
    function openWithdraw() public onlyOwner{
        withdrawOpen = true;
    }

}
