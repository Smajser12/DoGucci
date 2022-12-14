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
    
    uint256 public MinAlloc = 0.1 ether;
    uint256 public MaxAlloc = 30_000 ether; //In DOGE
    uint256 public TokenByDoge = 6666 ;

    mapping(address => uint256) public TokenAmount;
    mapping(address => uint256) public DogeAmount;

    function buyPresale() payable public {
        uint256 buyAmount = getAmountOfTokenByDogeAmount(msg.value);
        require(!withdrawOpen, "Withdraw is open");
        require(msg.value >= MinAlloc , "Value sent too low");
        require(DogeAmount[msg.sender] + msg.value <= MaxAlloc, "Full");
        require(Supply > buyAmount, "Not enough supply");
        
        DogeAmount[msg.sender] += msg.value;
        TokenAmount[msg.sender] += buyAmount;

        Supply -= buyAmount;
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

    function getAmountOfTokenByDogeAmount(uint256 _dogeAmount) public view returns (uint256){
        return _dogeAmount * TokenByDoge;
    }


    function claimPresale() public onlyOwner{
        payable(owner()).transfer(address(this).balance);
    }
    function claimUnsoldToken() public onlyOwner{
        ERC20(GCC).transfer(owner(), ERC20(GCC).balanceOf(address(this)));
    }
    function burnUnsoldToken() public onlyOwner{
        ERC20(GCC).transfer(address(0), ERC20(GCC).balanceOf(address(this)));
    }
    function openWithdraw() public onlyOwner{
        withdrawOpen = true;
    }
    function depositToken() public onlyOwner{
        ERC20(GCC).transferFrom(msg.sender, address(this), Supply);
    }
    function getTotalRaised() public view returns (uint256){
        return address(this).balance;
    }

}
