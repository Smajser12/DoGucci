import Web3 from "web3";import {DogeSale_ADDRESS, RPC} from "../Constants/Constants.js";
const DogeSale_ABI = require("../ABI/DogeSale.json");

export class DogeSale{

    constructor(provider, account){
        if(provider == undefined){
          this.web3 = new Web3(RPC);
        }else{
          this.web3 = new Web3(provider);
        }
        this.account = account;
        this.Contract = new this.web3.eth.Contract(DogeSale_ABI, DogeSale_ADDRESS).methods;
    }


      
async DogeAmount ( var0 ) {
    try{
        let res = await this.Contract.DogeAmount( var0 ).call();
        return res;
    }catch(err){
            console.error('[DogeAmountServices] - DogeAmount' + err);
        } 
};

  
async MaxAlloc (  ) {
    try{
        let res = await this.Contract.MaxAlloc(  ).call();
        return res;
    }catch(err){
            console.error('[MaxAllocServices] - MaxAlloc' + err);
        } 
};

  
async MinAlloc (  ) {
    try{
        let res = await this.Contract.MinAlloc(  ).call();
        return res;
    }catch(err){
            console.error('[MinAllocServices] - MinAlloc' + err);
        } 
};

  
async TokenAmount ( var0 ) {
    try{
        let res = await this.Contract.TokenAmount( var0 ).call();
        return res;
    }catch(err){
            console.error('[TokenAmountServices] - TokenAmount' + err);
        } 
};

  
async TokenByDoge (  ) {
    try{
        let res = await this.Contract.TokenByDoge(  ).call();
        return res;
    }catch(err){
            console.error('[TokenByDogeServices] - TokenByDoge' + err);
        } 
};

  
async burnUnsoldToken (  ) {
    try{
        await this.Contract.burnUnsoldToken(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[burnUnsoldTokenServices] - burnUnsoldToken' + err);
        return false
    } 
};

  
async buyPresale ( _value ) {
    try{
        await this.Contract.buyPresale(  ).send({
            from: this.account, value: _value
        });
        return true;
    }catch(err){
        console.error('[buyPresaleServices] - buyPresale' + err);
        return false
    } 
};

  
async claimPresale (  ) {
    try{
        await this.Contract.claimPresale(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[claimPresaleServices] - claimPresale' + err);
        return false
    } 
};

  
async claimToken (  ) {
    try{
        await this.Contract.claimToken(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[claimTokenServices] - claimToken' + err);
        return false
    } 
};

  
async claimUnsoldToken (  ) {
    try{
        await this.Contract.claimUnsoldToken(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[claimUnsoldTokenServices] - claimUnsoldToken' + err);
        return false
    } 
};

  
async depositToken (  ) {
    try{
        await this.Contract.depositToken(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[depositTokenServices] - depositToken' + err);
        return false
    } 
};

  
async getAmountOfTokenByDogeAmount ( _dogeAmount ) {
    try{
        let res = await this.Contract.getAmountOfTokenByDogeAmount( _dogeAmount ).call();
        return res;
    }catch(err){
            console.error('[getAmountOfTokenByDogeAmountServices] - getAmountOfTokenByDogeAmount' + err);
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

  
async getTotalRaised (  ) {
    try{
        let res = await this.Contract.getTotalRaised(  ).call();
        return res;
    }catch(err){
            console.error('[getTotalRaisedServices] - getTotalRaised' + err);
        } 
};

  
async openWithdraw (  ) {
    try{
        await this.Contract.openWithdraw(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[openWithdrawServices] - openWithdraw' + err);
        return false
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

  
async withdrawOpen (  ) {
    try{
        let res = await this.Contract.withdrawOpen(  ).call();
        return res;
    }catch(err){
            console.error('[withdrawOpenServices] - withdrawOpen' + err);
        } 
};

}
