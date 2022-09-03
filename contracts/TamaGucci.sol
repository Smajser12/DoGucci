// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TamaRewardManager.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "./type/AccessControl.sol";

contract TamaGucci is ERC721EnumerableUpgradeable,TamaGucciAccessControl{

  function initialize() public initializer {
    __ERC721_init("TamaGucci", "TG");
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
  //NFT ID => OBJECT ID => OBJECT;

  mapping(uint256 => objectType) public objectTypeByID;
  uint256 public objectTypeCount;

  mapping(uint256 => tamaGucciType) public tamaGucciTypeById;
  uint256 public typeCount;

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
    ERC20(TokenAddress).transferFrom(msg.sender,DevWallet,tamaType._price);



    tamagucci memory newTama = tamagucci(tamaType,_name);
    TamaGucciRewardManager(RewardManagerAddress).createNode(_type);

    tamagucciById[totalSupply()] = newTama;
    _mint(msg.sender, totalSupply());
  }

  function buyObject(uint256 _tamagucciID, uint256 _objectID,uint256 _color) public {

    objectType memory Type = objectTypeByID[_objectID];
    require(Type._id != 0, "not an object");
    require(ownerOf(_tamagucciID) == msg.sender, "not your tamagucci");
    require(tamagucciInventory[_tamagucciID][_objectID]._type._id == 0, "Already Bought an Item");

    ERC20(TokenAddress).transferFrom(msg.sender, DevWallet, Type._price);

    object memory newObject = object(Type,_color);
    tamagucciInventory[_tamagucciID][_objectID] = newObject; 

    TamaGucciRewardManager(RewardManagerAddress).boostNode(_tamagucciID, Type._bonus);
  }
  function buySetOfObject(uint256 _tamagucciID,uint256[] memory _objectsID,uint256[] memory _colors) public {
    require(_objectsID.length == _colors.length, "Not the same length");

    for(uint256 i = 0; i < _objectsID.length; i++){
      buyObject(_tamagucciID,_objectsID[i],_colors[i]);
    }
  }


  // *** ADMIN ***
  function createObjectType(uint256 _objectID, uint256 _price, uint256 _bonus) public onlyDevWalletAuthorized{
    objectType memory newObj = objectType(_objectID,_price,_bonus);
    objectTypeByID[_objectID] = newObj;
    objectTypeCount++;
  }

  function createTamaGucciType(uint256 _id, string memory _name, uint256 _price) public onlyDevWalletAuthorized{
    
    tamaGucciType memory newType = tamaGucciType(_id,_name,_price * 1 ether);
    tamaGucciTypeById[_id] = newType;
    typeCount++;
  }

  // *** GETTERS ***
  function getTamaGucciOfUser(address _user) public view returns (uint256[] memory){
    uint256 len = balanceOf(_user);
    uint256[] memory TamaGucciOfUser = new uint[](len);
    for(uint i = 0; i < len ; i++){
      TamaGucciOfUser[i] = (super.tokenOfOwnerByIndex(_user,i));
    }
    return TamaGucciOfUser;
  }

  function getInventoryOfTamaGucci(uint256 _tamagucciID) public view returns (object[] memory){
    object[] memory InventoryOfTamaGucci = new object[](objectTypeCount);
    for(uint i = 0; i < objectTypeCount ; i++){
      InventoryOfTamaGucci[i] = (tamagucciInventory[_tamagucciID][i  + 1]);
    }
    return InventoryOfTamaGucci;
  }

  function getNodeEntityOfTamaGucci(uint256 _tamagucciID) public view returns (TamaGucciRewardManager.NodeEntity memory){

    return TamaGucciRewardManager(RewardManagerAddress).getNodeByID(_tamagucciID);
  }

  function getFullTamaGucci(uint256 _tamagucciID) public view returns (tamagucci memory, object[] memory, TamaGucciRewardManager.NodeEntity memory){
    return (tamagucciById[_tamagucciID],getInventoryOfTamaGucci(_tamagucciID),getNodeEntityOfTamaGucci(_tamagucciID));
  }

  function getAllType() public view returns (tamaGucciType[] memory){
    tamaGucciType[] memory allType = new tamaGucciType[](typeCount);
    for(uint i = 0; i < typeCount ; i++){
      allType[i] = tamaGucciTypeById[i];
    }
    return allType;
  }

  function getAllObjectType() public view returns (objectType[] memory){
    objectType[] memory allType = new objectType[](objectTypeCount);
    for(uint i = 0; i < objectTypeCount ; i++){
      allType[i] = objectTypeByID[i+1];
    }
    return allType;
  }

  function getPriceOfID(uint256 _id) public view returns (uint256){
    return tamagucciById[_id]._type._price;
  }
}
