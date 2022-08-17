// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/ownable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";

contract TamaGucci is ERC721EnumerableUpgradeable{

  function initialize() public initializer {
    __ERC721_init("TamaGucci", "TittyGuccy");
    TransferPaused = true;
    DevWallet = msg.sender;
  }
    
  bool TransferPaused;

  address TMG;
  address DevWallet;

  modifier onlyDev {
    require(msg.sender == DevWallet, "Not Authorized");
    _;
  }
  

  //*** ARRAY HELPER ***
  //***Remove at Index ***

  function remove(uint256[] storage _arr, uint256 _index) internal {
        require(_index < _arr.length, "index out of bound");

        for (uint i = _index; i < _arr.length - 1; i++){
            _arr[i] = _arr[i + 1];
        }
        _arr.pop();
    }

  function _transfer(
        address from,
        address to,
        uint256 tokenId) internal override{
          require(!TransferPaused, "Transfer has been Paused");
          super._transfer(from,to,tokenId);
  }

  function mintTamaGucci(uint256 _plotTypeID) public {
    ERC20(TMG).transferFrom(msg.sender,address(this),0);

    _mint(msg.sender, super.totalSupply());
  }

  function setTokenAddress(address _tokenAddress) public onlyDev {
      TMG = _tokenAddress;
  }


  
}
