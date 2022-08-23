// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TamaRewardManager.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "./type/AccessControl.sol";

contract TamaGucci is ERC721EnumerableUpgradeable,TamaGucciAccessControl{

  function initialize() public initializer {
    __ERC721_init("TamaGucci", "TittyGuccy");
    TransferPaused = true;
    DevWallet = msg.sender;
  }

  struct tamaGucciType{
    uint256 _id;

    string _species;
    uint256 _price;

  }

  struct tamagucci{
    tamaGucciType _type;
    string _name;

  }

  struct objectType{
    uint256 _id;
    uint256 _price;
    uint256 _bonus;
  }

  struct object{
    objectType _type;
    uint256 _color;
  }

  bool TransferPaused;

  mapping(uint256 => tamagucci) public tamagucciById;
  mapping(uint256 => mapping(uint256 => object)) public tamagucciInventory;
  //NFT ID => OBJECT ID => COLOR ID => OBJECT;

  mapping(uint256 => objectType) public objectTypeByID;

  mapping(uint256 => tamaGucciType) public tamaGucciTypeById;

  function _transfer(
        address from,
        address to,
        uint256 tokenId) internal override{
          require(!TransferPaused, "Transfer has been Paused");
          super._transfer(from,to,tokenId);
  }

  function mintTamaGucci(string memory _name, uint256 _type) public {
    tamaGucciType memory tamaType  = tamaGucciTypeById[_type];
    require(tamaType._id != 0, "Type does not exist");
    ERC20(TokenAddress).transferFrom(msg.sender,address(this),tamaType._price);



    tamagucci memory newTama = tamagucci(tamaType,_name);
    TammaGucciRewardManager(RewardManagerAddress).createNode(_type);

    tamagucciById[totalSupply()] = newTama;
    _mint(msg.sender, totalSupply());
  }

  function buyObject(uint256 _tamagucciID, uint256 _objectID,uint256 _color) public {

    objectType memory Type = objectTypeByID[_objectID];
    require(Type._id != 0, "not an object");
    require(ownerOf(_tamagucciID) == msg.sender, "not your tamagucci");
    require(tamagucciInventory[_tamagucciID][_objectID]._type._id == 0, "Already Bought an Item");

    ERC20(TokenAddress).transferFrom(msg.sender, address(this), Type._price);

    object memory newObject = object(Type,_color);
    tamagucciInventory[_tamagucciID][_objectID] = newObject; 

    TammaGucciRewardManager(RewardManagerAddress).boostNode(_tamagucciID, Type._bonus);
  }




  // *** ADMIN ***
  function createObjectType(uint256 _objectID, uint256 _price, uint256 _bonus) public onlyDevWalletAuthorized{
    objectType memory newObj = objectType(_objectID,_price,_bonus);
    objectTypeByID[_objectID] = newObj;
  }

  function createTamaGucciType(uint256 _id, string memory _name, uint256 _price) public onlyDevWalletAuthorized{
    
    tamaGucciType memory newType = tamaGucciType(_id,_name,_price);
    tamaGucciTypeById[_id] = newType;

  }

  function getTamaGucciOfUser(address _user) public view returns (uint256[] memory){
    uint256 len = balanceOf(_user);
    uint256[] memory TamaGucciOfUser = new uint[](len);
    for(uint i = 0; i < len ; i++){
      TamaGucciOfUser[i] = (super.tokenOfOwnerByIndex(_user,i));
    }
    return TamaGucciOfUser;
  }
  


  
}
