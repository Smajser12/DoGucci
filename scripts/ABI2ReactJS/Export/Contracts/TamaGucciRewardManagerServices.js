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

  
async FeedAmountByID ( var0 ) {
    try{
        let res = await this.Contract.FeedAmountByID( var0 ).call();
        return res;
    }catch(err){
            console.error('[FeedAmountByIDServices] - FeedAmountByID' + err);
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

  
async StarveHungryRatio (  ) {
    try{
        let res = await this.Contract.StarveHungryRatio(  ).call();
        return res;
    }catch(err){
            console.error('[StarveHungryRatioServices] - StarveHungryRatio' + err);
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

  
async cleanNode ( _id ) {
    try{
        await this.Contract.cleanNode( _id ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[cleanNodeServices] - cleanNode' + err);
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

  
async createNodeType ( _type, _FeedingTime, _shitTime, _rewards, _reductionStarved, _reductionDirty, _feedPrice ) {
    try{
        await this.Contract.createNodeType( _type, _FeedingTime, _shitTime, _rewards, _reductionStarved, _reductionDirty, _feedPrice ).send({
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

  
async getBlockUntilDecay ( _ID ) {
    try{
        let res = await this.Contract.getBlockUntilDecay( _ID ).call();
        return res;
    }catch(err){
            console.error('[getBlockUntilDecayServices] - getBlockUntilDecay' + err);
        } 
};

  
async getBlockUntilHungry ( _nodeID ) {
    try{
        let res = await this.Contract.getBlockUntilHungry( _nodeID ).call();
        return res;
    }catch(err){
            console.error('[getBlockUntilHungryServices] - getBlockUntilHungry' + err);
        } 
};

  
async getCurrentDailyROI ( _nodeID ) {
    try{
        let res = await this.Contract.getCurrentDailyROI( _nodeID ).call();
        return res;
    }catch(err){
            console.error('[getCurrentDailyROIServices] - getCurrentDailyROI' + err);
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

  
async getHungryAtBlock ( _nodeID ) {
    try{
        let res = await this.Contract.getHungryAtBlock( _nodeID ).call();
        return res;
    }catch(err){
            console.error('[getHungryAtBlockServices] - getHungryAtBlock' + err);
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

  
async getIsNodeHungry ( _nodeID ) {
    try{
        let res = await this.Contract.getIsNodeHungry( _nodeID ).call();
        return res;
    }catch(err){
            console.error('[getIsNodeHungryServices] - getIsNodeHungry' + err);
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

  
async getPriceFeed ( _id ) {
    try{
        let res = await this.Contract.getPriceFeed( _id ).call();
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

  
async getStarvedAtBlock ( _nodeID ) {
    try{
        let res = await this.Contract.getStarvedAtBlock( _nodeID ).call();
        return res;
    }catch(err){
            console.error('[getStarvedAtBlockServices] - getStarvedAtBlock' + err);
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

  
async nodeTypeByID ( var0 ) {
    try{
        let res = await this.Contract.nodeTypeByID( var0 ).call();
        return res;
    }catch(err){
            console.error('[nodeTypeByIDServices] - nodeTypeByID' + err);
        } 
};

  
async sendDogeToPayment (  ) {
    try{
        await this.Contract.sendDogeToPayment(  ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[sendDogeToPaymentServices] - sendDogeToPayment' + err);
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

  
async setStarveHungryRatio ( _ratio ) {
    try{
        await this.Contract.setStarveHungryRatio( _ratio ).send({
            from: this.account
        });
        return true;
    }catch(err){
        console.error('[setStarveHungryRatioServices] - setStarveHungryRatio' + err);
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
