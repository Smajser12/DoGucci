import Web3 from "web3";import {GucciFaucet_ADDRESS, RPC} from "../Constants/Constants.js";
const GucciFaucet_ABI = require("../ABI/GucciFaucet.json");

export class GucciFaucet{

    constructor(provider, account){
        if(provider == undefined){
          this.web3 = new Web3(RPC);
        }else{
          this.web3 = new Web3(provider);
        }
        this.account = account;
        this.Contract = new this.web3.eth.Contract(GucciFaucet_ABI, GucciFaucet_ADDRESS).methods;
    }


      
async buyToken ( _amount, _value ) {
    try{
        await this.Contract.buyToken( _amount ).send({
            from: this.account, value: _value
        });
        return true;
    }catch(err){
        console.error('[buyTokenServices] - buyToken' + err);
        return false
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

  
async liquiditySupplyLeft (  ) {
    try{
        let res = await this.Contract.liquiditySupplyLeft(  ).call();
        return res;
    }catch(err){
            console.error('[liquiditySupplyLeftServices] - liquiditySupplyLeft' + err);
        } 
};

  
async owner (  ) {
    try{
        let res = await this.Contract.owner(  ).call();
        return res;
    }catch(err){
            console.error('[ownerServices] - owner' + err);
        } 
};

  
async redeemUnsoldToken (  ) {
    try{
        await this.Contract.redeemUnsoldToken(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[redeemUnsoldTokenServices] - redeemUnsoldToken' + err);
        return false
    } 
};

  
async renounceOwnership (  ) {
    try{
        await this.Contract.renounceOwnership(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[renounceOwnershipServices] - renounceOwnership' + err);
        return false
    } 
};

  
async setGucciTokenAddress ( _address ) {
    try{
        await this.Contract.setGucciTokenAddress( _address ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[setGucciTokenAddressServices] - setGucciTokenAddress' + err);
        return false
    } 
};

  
async transferOwnership ( newOwner ) {
    try{
        await this.Contract.transferOwnership( newOwner ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[transferOwnershipServices] - transferOwnership' + err);
        return false
    } 
};

}
