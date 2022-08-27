import Web3 from "web3";import {TamaGucciRewardManager_ADDRESS, RPC} from "../Constants/Constants.js";
const TamaGucciRewardManager_ABI = require("../ABI/TamaGucciRewardManager.json");

export class TamaGucciRewardManager{

    constructor(provider, account){
        if(provider == undefined){
          this.web3 = new Web3(RPC);
        }else{
          this.web3 = new Web3(provider);
        }
        this.account = account;
        this.Contract = new this.web3.eth.Contract(TamaGucciRewardManager_ABI, TamaGucciRewardManager_ADDRESS).methods;
    }


      
async AccessControledProxiableInitialize (  ) {
    try{
        await this.Contract.AccessControledProxiableInitialize(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[AccessControledProxiableInitializeServices] - AccessControledProxiableInitialize' + err);
        return false
    } 
};

  
async DevWallet (  ) {
    try{
        let res = await this.Contract.DevWallet(  ).call();
        return res;
    }catch(err){
            console.error('[DevWalletServices] - DevWallet' + err);
        } 
};

  
async NodeByID ( var0 ) {
    try{
        let res = await this.Contract.NodeByID( var0 ).call();
        return res;
    }catch(err){
            console.error('[NodeByIDServices] - NodeByID' + err);
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

  
async boostNode ( _nodeID, _boost ) {
    try{
        await this.Contract.boostNode( _nodeID, _boost ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[boostNodeServices] - boostNode' + err);
        return false
    } 
};

  
async claimReward ( _nodeID ) {
    try{
        await this.Contract.claimReward( _nodeID ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[claimRewardServices] - claimReward' + err);
        return false
    } 
};

  
async clearNode ( _id ) {
    try{
        await this.Contract.clearNode( _id ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[clearNodeServices] - clearNode' + err);
        return false
    } 
};

  
async createNode ( _nodeTypeID ) {
    try{
        await this.Contract.createNode( _nodeTypeID ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[createNodeServices] - createNode' + err);
        return false
    } 
};

  
async createNodeType ( _type, _FeedingTime, _shitTime, _rewards, _reductionStarved, _reductionDirty, _levelUpPrice, _feedPrice, _shitTimeRateLevelUp, _rewardRateLevelUp, _feedingTimeRateLevelUp ) {
    try{
        await this.Contract.createNodeType( _type, _FeedingTime, _shitTime, _rewards, _reductionStarved, _reductionDirty, _levelUpPrice, _feedPrice, _shitTimeRateLevelUp, _rewardRateLevelUp, _feedingTimeRateLevelUp ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[createNodeTypeServices] - createNodeType' + err);
        return false
    } 
};

  
async currencyAuthorized ( var0 ) {
    try{
        let res = await this.Contract.currencyAuthorized( var0 ).call();
        return res;
    }catch(err){
            console.error('[currencyAuthorizedServices] - currencyAuthorized' + err);
        } 
};

  
async feedNode ( _id, _value ) {
    try{
        await this.Contract.feedNode( _id ).send({
            from: this.account, value: _value
        });
        return true;
    }catch(err){
        console.error('[feedNodeServices] - feedNode' + err);
        return false
    } 
};

  
async getBlockUntilClog ( _nodeID ) {
    try{
        let res = await this.Contract.getBlockUntilClog( _nodeID ).call();
        return res;
    }catch(err){
            console.error('[getBlockUntilClogServices] - getBlockUntilClog' + err);
        } 
};

  
async getCurrentNodeOwner ( _nodeID ) {
    try{
        let res = await this.Contract.getCurrentNodeOwner( _nodeID ).call();
        return res;
    }catch(err){
            console.error('[getCurrentNodeOwnerServices] - getCurrentNodeOwner' + err);
        } 
};

  
async getIsNodeClogged ( _nodeID ) {
    try{
        let res = await this.Contract.getIsNodeClogged( _nodeID ).call();
        return res;
    }catch(err){
            console.error('[getIsNodeCloggedServices] - getIsNodeClogged' + err);
        } 
};

  
async getIsNodeDecayed ( _nodeID ) {
    try{
        let res = await this.Contract.getIsNodeDecayed( _nodeID ).call();
        return res;
    }catch(err){
            console.error('[getIsNodeDecayedServices] - getIsNodeDecayed' + err);
        } 
};

  
async getLevelOfNode ( _nodeID ) {
    try{
        let res = await this.Contract.getLevelOfNode( _nodeID ).call();
        return res;
    }catch(err){
            console.error('[getLevelOfNodeServices] - getLevelOfNode' + err);
        } 
};

  
async getLevelUpPriceOfId ( _Id ) {
    try{
        let res = await this.Contract.getLevelUpPriceOfId( _Id ).call();
        return res;
    }catch(err){
            console.error('[getLevelUpPriceOfIdServices] - getLevelUpPriceOfId' + err);
        } 
};

  
async getMaxLevel (  ) {
    try{
        let res = await this.Contract.getMaxLevel(  ).call();
        return res;
    }catch(err){
            console.error('[getMaxLevelServices] - getMaxLevel' + err);
        } 
};

  
async getNodeByID ( _Id ) {
    try{
        let res = await this.Contract.getNodeByID( _Id ).call();
        return res;
    }catch(err){
            console.error('[getNodeByIDServices] - getNodeByID' + err);
        } 
};

  
async getNodeTypeByID ( _Id ) {
    try{
        let res = await this.Contract.getNodeTypeByID( _Id ).call();
        return res;
    }catch(err){
            console.error('[getNodeTypeByIDServices] - getNodeTypeByID' + err);
        } 
};

  
async getOwnerOfNode ( _nodeID ) {
    try{
        let res = await this.Contract.getOwnerOfNode( _nodeID ).call();
        return res;
    }catch(err){
            console.error('[getOwnerOfNodeServices] - getOwnerOfNode' + err);
        } 
};

  
async getPriceFeed ( _Id ) {
    try{
        let res = await this.Contract.getPriceFeed( _Id ).call();
        return res;
    }catch(err){
            console.error('[getPriceFeedServices] - getPriceFeed' + err);
        } 
};

  
async getRewardByID ( _ID ) {
    try{
        let res = await this.Contract.getRewardByID( _ID ).call();
        return res;
    }catch(err){
            console.error('[getRewardByIDServices] - getRewardByID' + err);
        } 
};

  
async getRewardOfUser ( _user ) {
    try{
        let res = await this.Contract.getRewardOfUser( _user ).call();
        return res;
    }catch(err){
            console.error('[getRewardOfUserServices] - getRewardOfUser' + err);
        } 
};

  
async getRewardPerBlockOfID ( _ID ) {
    try{
        let res = await this.Contract.getRewardPerBlockOfID( _ID ).call();
        return res;
    }catch(err){
            console.error('[getRewardPerBlockOfIDServices] - getRewardPerBlockOfID' + err);
        } 
};

  
async getblockUntilDecay ( _ID ) {
    try{
        let res = await this.Contract.getblockUntilDecay( _ID ).call();
        return res;
    }catch(err){
            console.error('[getblockUntilDecayServices] - getblockUntilDecay' + err);
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

  
async levelUpNode ( _currency, _id ) {
    try{
        await this.Contract.levelUpNode( _currency, _id ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[levelUpNodeServices] - levelUpNode' + err);
        return false
    } 
};

  
async maxNodeLevel (  ) {
    try{
        let res = await this.Contract.maxNodeLevel(  ).call();
        return res;
    }catch(err){
            console.error('[maxNodeLevelServices] - maxNodeLevel' + err);
        } 
};

  
async sendAvaxToPayment (  ) {
    try{
        await this.Contract.sendAvaxToPayment(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[sendAvaxToPaymentServices] - sendAvaxToPayment' + err);
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

  
async setCurrencyAuthorized ( _currency, _value ) {
    try{
        await this.Contract.setCurrencyAuthorized( _currency, _value ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[setCurrencyAuthorizedServices] - setCurrencyAuthorized' + err);
        return false
    } 
};

  
async setFeedingTime ( _nodeType, _FeedingTime ) {
    try{
        await this.Contract.setFeedingTime( _nodeType, _FeedingTime ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[setFeedingTimeServices] - setFeedingTime' + err);
        return false
    } 
};

  
async setLevelUpPrice ( _nodeTypeID, _price ) {
    try{
        await this.Contract.setLevelUpPrice( _nodeTypeID, _price ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[setLevelUpPriceServices] - setLevelUpPrice' + err);
        return false
    } 
};

  
async setMaxLevel ( _level ) {
    try{
        await this.Contract.setMaxLevel( _level ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[setMaxLevelServices] - setMaxLevel' + err);
        return false
    } 
};

  
async setRepairPrice ( _nodeTypeID, _price ) {
    try{
        await this.Contract.setRepairPrice( _nodeTypeID, _price ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[setRepairPriceServices] - setRepairPrice' + err);
        return false
    } 
};

  
async setReward ( _nodeType, _reward ) {
    try{
        await this.Contract.setReward( _nodeType, _reward ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[setRewardServices] - setReward' + err);
        return false
    } 
};

  
async totalNodes (  ) {
    try{
        let res = await this.Contract.totalNodes(  ).call();
        return res;
    }catch(err){
            console.error('[totalNodesServices] - totalNodes' + err);
        } 
};

}
