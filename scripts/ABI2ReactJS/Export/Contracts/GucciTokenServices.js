import Web3 from "web3";import {GucciToken_ADDRESS, RPC} from "../Constants/Constants.js";
const GucciToken_ABI = require("../ABI/GucciToken.json");

export class GucciToken{

    constructor(provider, account){
        if(provider == undefined){
          this.web3 = new Web3(RPC);
        }else{
          this.web3 = new Web3(provider);
        }
        this.account = account;
        this.Contract = new this.web3.eth.Contract(GucciToken_ABI, GucciToken_ADDRESS).methods;
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

  
async allowance ( owner, spender ) {
    try{
        let res = await this.Contract.allowance( owner, spender ).call();
        return res;
    }catch(err){
            console.error('[allowanceServices] - allowance' + err);
        } 
};

  
async approve ( spender, amount ) {
    try{
        await this.Contract.approve( spender, amount ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[approveServices] - approve' + err);
        return false
    } 
};

  
async balanceOf ( account ) {
    try{
        let res = await this.Contract.balanceOf( account ).call();
        return res;
    }catch(err){
            console.error('[balanceOfServices] - balanceOf' + err);
        } 
};

  
async decimals (  ) {
    try{
        let res = await this.Contract.decimals(  ).call();
        return res;
    }catch(err){
            console.error('[decimalsServices] - decimals' + err);
        } 
};

  
async decreaseAllowance ( spender, subtractedValue ) {
    try{
        await this.Contract.decreaseAllowance( spender, subtractedValue ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[decreaseAllowanceServices] - decreaseAllowance' + err);
        return false
    } 
};

  
async increaseAllowance ( spender, addedValue ) {
    try{
        await this.Contract.increaseAllowance( spender, addedValue ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[increaseAllowanceServices] - increaseAllowance' + err);
        return false
    } 
};

  
async mint ( _user, _amount ) {
    try{
        await this.Contract.mint( _user, _amount ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[mintServices] - mint' + err);
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

  
async symbol (  ) {
    try{
        let res = await this.Contract.symbol(  ).call();
        return res;
    }catch(err){
            console.error('[symbolServices] - symbol' + err);
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

  
async transfer ( to, amount ) {
    try{
        await this.Contract.transfer( to, amount ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[transferServices] - transfer' + err);
        return false
    } 
};

  
async transferFrom ( from, to, amount ) {
    try{
        await this.Contract.transferFrom( from, to, amount ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[transferFromServices] - transferFrom' + err);
        return false
    } 
};

}
