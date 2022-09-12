import Web3 from "web3";import {TamaGucci_ADDRESS, RPC} from "../Constants/Constants.js";
const TamaGucci_ABI = require("../ABI/TamaGucci.json");

export class TamaGucci{

    constructor(provider, account){
        if(provider == undefined){
          this.web3 = new Web3(RPC);
        }else{
          this.web3 = new Web3(provider);
        }
        this.account = account;
        this.Contract = new this.web3.eth.Contract(TamaGucci_ABI, TamaGucci_ADDRESS).methods;
    }


      
async DevWallet (  ) {
    try{
        let res = await this.Contract.DevWallet(  ).call();
        return res;
    }catch(err){
            console.error('[DevWalletServices] - DevWallet' + err);
        } 
};

  
async RewardManagerAddress (  ) {
    try{
        let res = await this.Contract.RewardManagerAddress(  ).call();
        return res;
    }catch(err){
            console.error('[RewardManagerAddressServices] - RewardManagerAddress' + err);
        } 
};

  
async RewardManagerAuthorized ( var0 ) {
    try{
        let res = await this.Contract.RewardManagerAuthorized( var0 ).call();
        return res;
    }catch(err){
            console.error('[RewardManagerAuthorizedServices] - RewardManagerAuthorized' + err);
        } 
};

  
async TVL (  ) {
    try{
        let res = await this.Contract.TVL(  ).call();
        return res;
    }catch(err){
            console.error('[TVLServices] - TVL' + err);
        } 
};

  
async TamaGucciAddress (  ) {
    try{
        let res = await this.Contract.TamaGucciAddress(  ).call();
        return res;
    }catch(err){
            console.error('[TamaGucciAddressServices] - TamaGucciAddress' + err);
        } 
};

  
async TamaGucciAuthorized ( var0 ) {
    try{
        let res = await this.Contract.TamaGucciAuthorized( var0 ).call();
        return res;
    }catch(err){
            console.error('[TamaGucciAuthorizedServices] - TamaGucciAuthorized' + err);
        } 
};

  
async TokenAddress (  ) {
    try{
        let res = await this.Contract.TokenAddress(  ).call();
        return res;
    }catch(err){
            console.error('[TokenAddressServices] - TokenAddress' + err);
        } 
};

  
async TokenAuthorized ( var0 ) {
    try{
        let res = await this.Contract.TokenAuthorized( var0 ).call();
        return res;
    }catch(err){
            console.error('[TokenAuthorizedServices] - TokenAuthorized' + err);
        } 
};

  
async Treasury (  ) {
    try{
        let res = await this.Contract.Treasury(  ).call();
        return res;
    }catch(err){
            console.error('[TreasuryServices] - Treasury' + err);
        } 
};

  
async approve ( to, tokenId ) {
    try{
        await this.Contract.approve( to, tokenId ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[approveServices] - approve' + err);
        return false
    } 
};

  
async balanceOf ( owner ) {
    try{
        let res = await this.Contract.balanceOf( owner ).call();
        return res;
    }catch(err){
            console.error('[balanceOfServices] - balanceOf' + err);
        } 
};

  
async buyObject ( _tamagucciID, _objectID, _color ) {
    try{
        await this.Contract.buyObject( _tamagucciID, _objectID, _color ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[buyObjectServices] - buyObject' + err);
        return false
    } 
};

  
async buySetOfObject ( _tamagucciID, _objectsID, _colors ) {
    try{
        await this.Contract.buySetOfObject( _tamagucciID, _objectsID, _colors ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[buySetOfObjectServices] - buySetOfObject' + err);
        return false
    } 
};

  
async createObjectType ( _objectID, _price, _bonus ) {
    try{
        await this.Contract.createObjectType( _objectID, _price, _bonus ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[createObjectTypeServices] - createObjectType' + err);
        return false
    } 
};

  
async createTamaGucciType ( _id, _name, _price ) {
    try{
        await this.Contract.createTamaGucciType( _id, _name, _price ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[createTamaGucciTypeServices] - createTamaGucciType' + err);
        return false
    } 
};

  
async getAllObjectType (  ) {
    try{
        let res = await this.Contract.getAllObjectType(  ).call();
        return res;
    }catch(err){
            console.error('[getAllObjectTypeServices] - getAllObjectType' + err);
        } 
};

  
async getAllType (  ) {
    try{
        let res = await this.Contract.getAllType(  ).call();
        return res;
    }catch(err){
            console.error('[getAllTypeServices] - getAllType' + err);
        } 
};

  
async getApproved ( tokenId ) {
    try{
        let res = await this.Contract.getApproved( tokenId ).call();
        return res;
    }catch(err){
            console.error('[getApprovedServices] - getApproved' + err);
        } 
};

  
async getFullTamaGucci ( _tamagucciID ) {
    try{
        let res = await this.Contract.getFullTamaGucci( _tamagucciID ).call();
        return res;
    }catch(err){
            console.error('[getFullTamaGucciServices] - getFullTamaGucci' + err);
        } 
};

  
async getInventoryOfTamaGucci ( _tamagucciID ) {
    try{
        let res = await this.Contract.getInventoryOfTamaGucci( _tamagucciID ).call();
        return res;
    }catch(err){
            console.error('[getInventoryOfTamaGucciServices] - getInventoryOfTamaGucci' + err);
        } 
};

  
async getNodeEntityOfTamaGucci ( _tamagucciID ) {
    try{
        let res = await this.Contract.getNodeEntityOfTamaGucci( _tamagucciID ).call();
        return res;
    }catch(err){
            console.error('[getNodeEntityOfTamaGucciServices] - getNodeEntityOfTamaGucci' + err);
        } 
};

  
async getPriceOfAmount ( _amount ) {
    try{
        let res = await this.Contract.getPriceOfAmount( _amount ).call();
        return res;
    }catch(err){
            console.error('[getPriceOfAmountServices] - getPriceOfAmount' + err);
        } 
};

  
async getPriceOfID ( _id ) {
    try{
        let res = await this.Contract.getPriceOfID( _id ).call();
        return res;
    }catch(err){
            console.error('[getPriceOfIDServices] - getPriceOfID' + err);
        } 
};

  
async getTamaGucciOfUser ( _user ) {
    try{
        let res = await this.Contract.getTamaGucciOfUser( _user ).call();
        return res;
    }catch(err){
            console.error('[getTamaGucciOfUserServices] - getTamaGucciOfUser' + err);
        } 
};

  
async getWDogePriceOfTamaGucci ( _tamagucciType ) {
    try{
        let res = await this.Contract.getWDogePriceOfTamaGucci( _tamagucciType ).call();
        return res;
    }catch(err){
            console.error('[getWDogePriceOfTamaGucciServices] - getWDogePriceOfTamaGucci' + err);
        } 
};

  
async initialize (  ) {
    try{
        await this.Contract.initialize(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[initializeServices] - initialize' + err);
        return false
    } 
};

  
async isApprovedForAll ( owner, operator ) {
    try{
        let res = await this.Contract.isApprovedForAll( owner, operator ).call();
        return res;
    }catch(err){
            console.error('[isApprovedForAllServices] - isApprovedForAll' + err);
        } 
};

  
async mintTamaGucci ( _name, _type, _value ) {
    try{
        await this.Contract.mintTamaGucci( _name, _type ).send({
            from: this.account, value: _value
        });
        return true;
    }catch(err){
        console.error('[mintTamaGucciServices] - mintTamaGucci' + err);
        return false
    } 
};

  
async name (  ) {
    try{
        let res = await this.Contract.name(  ).call();
        return res;
    }catch(err){
            console.error('[nameServices] - name' + err);
        } 
};

  
async objectTypeByID ( var0 ) {
    try{
        let res = await this.Contract.objectTypeByID( var0 ).call();
        return res;
    }catch(err){
            console.error('[objectTypeByIDServices] - objectTypeByID' + err);
        } 
};

  
async objectTypeCount (  ) {
    try{
        let res = await this.Contract.objectTypeCount(  ).call();
        return res;
    }catch(err){
            console.error('[objectTypeCountServices] - objectTypeCount' + err);
        } 
};

  
async ownerOf ( tokenId ) {
    try{
        let res = await this.Contract.ownerOf( tokenId ).call();
        return res;
    }catch(err){
            console.error('[ownerOfServices] - ownerOf' + err);
        } 
};

  
async safeTransferFrom ( from, to, tokenId ) {
    try{
        await this.Contract.safeTransferFrom( from, to, tokenId ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[safeTransferFromServices] - safeTransferFrom' + err);
        return false
    } 
};

  
async safeTransferFrom ( from, to, tokenId, data ) {
    try{
        await this.Contract.safeTransferFrom( from, to, tokenId, data ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[safeTransferFromServices] - safeTransferFrom' + err);
        return false
    } 
};

  
async setAll ( _toSet ) {
    try{
        await this.Contract.setAll( _toSet ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[setAllServices] - setAll' + err);
        return false
    } 
};

  
async setApprovalForAll ( operator, approved ) {
    try{
        await this.Contract.setApprovalForAll( operator, approved ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[setApprovalForAllServices] - setApprovalForAll' + err);
        return false
    } 
};

  
async supportsInterface ( interfaceId ) {
    try{
        let res = await this.Contract.supportsInterface( interfaceId ).call();
        return res;
    }catch(err){
            console.error('[supportsInterfaceServices] - supportsInterface' + err);
        } 
};

  
async symbol (  ) {
    try{
        let res = await this.Contract.symbol(  ).call();
        return res;
    }catch(err){
            console.error('[symbolServices] - symbol' + err);
        } 
};

  
async tamaGucciTypeById ( var0 ) {
    try{
        let res = await this.Contract.tamaGucciTypeById( var0 ).call();
        return res;
    }catch(err){
            console.error('[tamaGucciTypeByIdServices] - tamaGucciTypeById' + err);
        } 
};

  
async tamagucciById ( var0 ) {
    try{
        let res = await this.Contract.tamagucciById( var0 ).call();
        return res;
    }catch(err){
            console.error('[tamagucciByIdServices] - tamagucciById' + err);
        } 
};

  
async tamagucciInventory ( var0, var1 ) {
    try{
        let res = await this.Contract.tamagucciInventory( var0, var1 ).call();
        return res;
    }catch(err){
            console.error('[tamagucciInventoryServices] - tamagucciInventory' + err);
        } 
};

  
async tokenByIndex ( index ) {
    try{
        let res = await this.Contract.tokenByIndex( index ).call();
        return res;
    }catch(err){
            console.error('[tokenByIndexServices] - tokenByIndex' + err);
        } 
};

  
async tokenOfOwnerByIndex ( owner, index ) {
    try{
        let res = await this.Contract.tokenOfOwnerByIndex( owner, index ).call();
        return res;
    }catch(err){
            console.error('[tokenOfOwnerByIndexServices] - tokenOfOwnerByIndex' + err);
        } 
};

  
async tokenURI ( tokenId ) {
    try{
        let res = await this.Contract.tokenURI( tokenId ).call();
        return res;
    }catch(err){
            console.error('[tokenURIServices] - tokenURI' + err);
        } 
};

  
async totalSupply (  ) {
    try{
        let res = await this.Contract.totalSupply(  ).call();
        return res;
    }catch(err){
            console.error('[totalSupplyServices] - totalSupply' + err);
        } 
};

  
async transferFrom ( from, to, tokenId ) {
    try{
        await this.Contract.transferFrom( from, to, tokenId ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[transferFromServices] - transferFrom' + err);
        return false
    } 
};

  
async typeCount (  ) {
    try{
        let res = await this.Contract.typeCount(  ).call();
        return res;
    }catch(err){
            console.error('[typeCountServices] - typeCount' + err);
        } 
};

  
async uniswapV2Router (  ) {
    try{
        let res = await this.Contract.uniswapV2Router(  ).call();
        return res;
    }catch(err){
            console.error('[uniswapV2RouterServices] - uniswapV2Router' + err);
        } 
};

}
