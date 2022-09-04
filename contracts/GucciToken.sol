// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./type/AccessControlBasic.sol";




contract GucciToken is ERC20,TamaGucciAccessControlBasic{

    constructor() ERC20("GUCCI","GucciToken"){
        _mint(msg.sender, 2_000_000 ether);
    }

    function mint(address _user, uint256 _amount) public onlyRewardManager{
        _mint(_user, _amount);
    }
    
    function burn(address _user, uint256 _amount) public onlyRewardManager{
        _burn(_user, _amount);
    }



}
