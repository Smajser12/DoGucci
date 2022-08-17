// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/ownable.sol";



contract DogeSale is Ownable{


    constructor(address _Doge){
        Doge = _Doge;
        
    }

    uint256 round = 0;
    uint256 SupplySold = 1_000_000;
    uint256 SupplyLeft = 1_000_000;
    address Doge;

    // ___Roles___
    mapping(address => bool) public SeedRound;
    mapping(address => bool) public BetaTester;
    mapping(address => bool) public WhiteList;
    

    uint256 public MaxAlloc = 10_000 ether; //In OIL
    uint256 public TokenPrice = 1 ether;
    mapping(address => uint256) public TokenAmount; //Token Amount Bought by the User

    function buyPresale(uint256 _amount) payable public {
        uint256 priceOfAmount = getPriceOfAmount(_amount);
        require(msg.value == priceOfAmount, "Wrong Value sent");
        require(TokenAmount[msg.sender] <= MaxAlloc, "Full");
        
        TokenAmount[msg.sender] += _amount;

        SupplyLeft -= _amount;
    }

    function claimToken() public {

        uint256 amountOfUser = TokenAmount[msg.sender];
        TokenAmount[msg.sender] = 0;

        ERC20(Doge).transfer(msg.sender, amountOfUser);
    }

    // function depositPresale() external onlyOwner{
    //     ERC20(tokenAddress).transferFrom(msg.sender, address(this), SupplySold * 1 ether);
    // }

    function nextRound() public onlyOwner{
        round++;
    }
    function claimPresale() public onlyOwner{
        payable(owner()).transfer(address(this).balance);
    }
    function getPriceOfAmount(uint256 _amount) public view returns (uint256){
        return _amount * TokenPrice;
    }
    function setWhiteList(address[] memory _whiteList) public onlyOwner{
        for(uint256 i = 0; i < _whiteList.length; i++){
           WhiteList[_whiteList[i]] = true;
        }
    }


}
