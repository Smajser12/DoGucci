
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "./type/AccessControlProxi.sol";
import "./TamaGucci.sol";
import "./GucciToken.sol";


contract TamaGucciRewardManager is TamaGucciAccessControlProxi {

    struct NodeType
    {
        uint256 Base;
        uint256 FeedingTime;
        uint256 ShitTime;
        uint256 ReductionWhenDirty;
        uint256 ReductionWhenStarved;

        uint256 FeedPrice;
    }

    struct NodeEntity{
        uint256 NodeTypeID; // Type Of Node
        uint256 Id; // Unique ID of Node

        uint256 creationTime;
        uint256 lastFeedTime; // => Last Feed Time, si jamais pas Feed 5 fois d'affilés (5J) => DEAD
        uint256 lastClaimTime;
        uint256 lastShitTime; // => Last Cleaning Time, 50% de reduction si pas clean.
        uint256 currentRewards; //Current base token emission of Node (Base + LEVELUP)
        uint256 boost; //Current Boost of Node (Gucci Belt) (Feeding)

        uint256 FeedingTime; // Number of Block before the boy is hungry and you can Feed Him
        uint256 ShitTime; // Number of Block before the Node is full of SHIT and needs to be Cleaned, it varies after each shit
        uint256 DirtyReduction; // % of reduction
        uint256 StarvedReduction; // % of reduction

        uint256 totalRewardsSinceCreation;
    }

    mapping(uint256 => NodeEntity) public NodeByID;
    mapping(uint256 => NodeType) public nodeTypeByID;
    mapping(uint256 => uint256) public FeedAmountByID;

    mapping(address => bool) public currencyAuthorized;


    uint256 public totalNodes;
    uint256 public TVL;

    event NodeClaimed(uint _NodeID, uint Amount);
    event PlotClaimed(uint _PlotID, uint Amount);

    function initialize() public initializer{
        AccessControledProxiableInitialize();
    }

    //REWARD
    function createNode(uint256 _nodeTypeID) public onlyTamaGucci returns (uint256) {

        NodeEntity memory newNode = NodeEntity({
        NodeTypeID: _nodeTypeID,
        Id : totalNodes,
        creationTime: block.number,
        lastFeedTime: block.number,
        lastClaimTime: block.number,
        lastShitTime: block.number,
        currentRewards : nodeTypeByID[_nodeTypeID].Base,
        boost : 100,
        FeedingTime : nodeTypeByID[_nodeTypeID].FeedingTime,
        ShitTime : nodeTypeByID[_nodeTypeID].ShitTime,
        DirtyReduction : nodeTypeByID[_nodeTypeID].ReductionWhenDirty,
        StarvedReduction : nodeTypeByID[_nodeTypeID].ReductionWhenStarved,
        totalRewardsSinceCreation: 0
        });

        NodeByID[totalNodes] = newNode;
        totalNodes++;

        return newNode.Id;
    }

     function createNodeType(uint256 _type, uint256 _FeedingTime,uint256 _shitTime, uint256 _rewards,uint256 _reductionStarved,uint256 _reductionDirty,uint256 _feedPrice) public onlyDevWalletAuthorized{
        NodeType memory newType = NodeType(
        _rewards,
        _FeedingTime,
        _shitTime,
        _reductionDirty,
        _reductionStarved,
        _feedPrice  * 1 ether
        );
        nodeTypeByID[_type] = newType;
    }

    function getRewardByID(uint256 _ID) public view returns (uint256 TotalReward)
    {
        NodeEntity memory node = getNodeByID(_ID);
        uint256 DecayAtBlock = node.lastFeedTime + (node.FeedingTime * 7);
        uint256 ClogAtBlock = node.lastShitTime + node.ShitTime;
        uint256 currentRewardPerBlock = (node.currentRewards * node.boost) / 100;
        if(block.number > DecayAtBlock && block.number > ClogAtBlock) // ADD STATE VERIF FOR DECAY
        {
            if(DecayAtBlock > ClogAtBlock)
            {
                // add before clog
                TotalReward += (ClogAtBlock - node.lastShitTime) * (currentRewardPerBlock);
                // add after clog before decays
                 //Clogging
                TotalReward += (DecayAtBlock - ClogAtBlock) * (currentRewardPerBlock * node.DirtyReduction / 100);
                // add after clog and decay
                 //Decaying
                TotalReward += (block.number - DecayAtBlock) * (currentRewardPerBlock * node.DirtyReduction * node.StarvedReduction / 10000 );
            }
            else{ //Decay then clog
                //add before decay (only if it hasn't decay before the last claim Time)
                if(node.lastShitTime >= DecayAtBlock) 
                {
                    TotalReward += (ClogAtBlock - node.lastShitTime) * (currentRewardPerBlock * node.StarvedReduction / 100); //Before clog (already decayed)

                    TotalReward += (block.number - ClogAtBlock) * (currentRewardPerBlock * node.StarvedReduction * node.DirtyReduction / 10000);
                }
                else{
                    TotalReward += (DecayAtBlock - node.lastShitTime) * (currentRewardPerBlock);
                    //add after Decay and before Clog
                    TotalReward += (ClogAtBlock - DecayAtBlock) * (currentRewardPerBlock * node.StarvedReduction / 100);
                    // add after clog and decay
                    TotalReward += (block.number - ClogAtBlock) * (currentRewardPerBlock * node.DirtyReduction * node.StarvedReduction / 10000);
                }
            }
            return TotalReward;
        }
        if(block.number > DecayAtBlock)
        {
            //Before
            if(node.lastShitTime < DecayAtBlock)
            {
                
                TotalReward += (DecayAtBlock - node.lastShitTime) * currentRewardPerBlock;
            //and After
                TotalReward += (block.number - DecayAtBlock) * (currentRewardPerBlock * node.StarvedReduction) / 100;
            }
            else{
                TotalReward += (block.number - node.lastShitTime) * (currentRewardPerBlock * node.StarvedReduction) / 100;
            }
            return TotalReward;
        }
        if(block.number > ClogAtBlock)
        {
            //Before
            TotalReward += (ClogAtBlock - node.lastShitTime) * currentRewardPerBlock;
            //and After
            TotalReward += (block.number - ClogAtBlock) * (currentRewardPerBlock * node.DirtyReduction) / 100;
            return TotalReward;
            
        }
        return (block.number - node.lastClaimTime) * currentRewardPerBlock;
    }

    function getRewardPerBlockOfID(uint256 _ID) public view returns(uint256)
    {
        NodeEntity storage node = NodeByID[_ID];
        uint256 blockAmount = block.number - node.lastClaimTime;
        uint256 currentRewardsPerBlock = (node.currentRewards * node.boost) / 100;

        if(blockAmount > node.ShitTime && blockAmount > node.FeedingTime)
                return (currentRewardsPerBlock * node.StarvedReduction * node.DirtyReduction) / 10000;
        if(blockAmount > node.FeedingTime){
            return (currentRewardsPerBlock * node.StarvedReduction) / 100;
        }
        if(blockAmount > node.ShitTime)
            return (currentRewardsPerBlock * node.DirtyReduction) / 100;
        return (currentRewardsPerBlock);
    }

    function claimReward(uint _nodeID) public {
        uint256 _reward = getRewardByID(_nodeID);
        NodeByID[_nodeID].totalRewardsSinceCreation += _reward;

        processNode(_nodeID);
        cleanNode(_nodeID);
        GucciToken(TokenAddress).mint(getOwnerOfNode(_nodeID), _reward);

        emit NodeClaimed(_nodeID, _reward);
    }
    


    function getCurrentNodeOwner(uint256 _nodeID) public view returns(address)
    {
        return TamaGucci(TamaGucciAddress).ownerOf(_nodeID);
    }

    function processNode(uint _ID) internal {
        NodeByID[_ID].lastClaimTime = block.number;
    }

    function boostNode(uint256 _nodeID, uint256 _boost) public onlyTamaGucci{
        NodeByID[_nodeID].boost += _boost;
    }

    function feedNode(uint _id) public payable {
        require(msg.value == nodeTypeByID[NodeByID[_id].NodeTypeID].FeedPrice,"Wrong value");
        require(NodeByID[_id].lastFeedTime + NodeByID[_id].FeedingTime < block.number, "Already fed");
        TVL += msg.value;
        
        claimReward(_id);
        NodeByID[_id].lastFeedTime = block.number;
        NodeByID[_id].boost += 1;
    }

    function cleanNode(uint256 _id) public {
        require(getOwnerOfNode(_id) == msg.sender, "Not your Node");
        NodeByID[_id].lastShitTime = block.number;
        NodeByID[_id].ShitTime = ((block.timestamp * block.number / block.difficulty + 420) % 24) * (1 minutes / 2); // 2 seconds block time on DogeChain
    }

    function getPriceFeed(uint256 _id) public view returns(uint256){
        return nodeTypeByID[NodeByID[_id].NodeTypeID].FeedPrice;
    }

    function getRewardOfUser(address _user) public view returns (uint256) {
       uint total = 0;
        uint[] memory NodeOfUser = TamaGucci(TamaGucciAddress).getTamaGucciOfUser(_user);
        
        for(uint i = 0; i < NodeOfUser.length; i++)
        {
            total += getRewardByID(NodeOfUser[i]);
        }
        return total;
    }

    //CLOG
    function getIsNodeClogged(uint256 _nodeID) public view returns (bool){
       return (block.number - NodeByID[_nodeID].lastShitTime > NodeByID[_nodeID].ShitTime);
    }
    
    function getBlockUntilClog(uint256 _nodeID) public view returns (uint256){
        require(NodeByID[_nodeID].lastShitTime + NodeByID[_nodeID].ShitTime >= block.number, "Already Clogged");
        return (NodeByID[_nodeID].lastShitTime + NodeByID[_nodeID].ShitTime - block.number);
    }
    //DECAY
    function getIsNodeDecayed(uint256 _nodeID) public view returns (bool){
        return (block.number - NodeByID[_nodeID].lastFeedTime > NodeByID[_nodeID].FeedingTime * 7);
    }
    function getIsNodeHungry(uint256 _nodeID) public view returns (bool){
        return (block.number - NodeByID[_nodeID].lastFeedTime > NodeByID[_nodeID].FeedingTime);
    }

    function getBlockUntilDecay(uint256 _ID) public view returns(uint256){
        NodeEntity storage node = NodeByID[_ID];
        require(node.lastFeedTime + node.FeedingTime > block.number , "Already decayed (starved)");
        return (node.lastFeedTime + (node.FeedingTime * 7) - block.number);
    }

    function getBlockUntilHungry(uint256 _nodeID) public view returns (uint256){
        require(NodeByID[_nodeID].lastFeedTime + NodeByID[_nodeID].FeedingTime >= block.number, "Already Hungry");
        return (NodeByID[_nodeID].lastFeedTime + NodeByID[_nodeID].FeedingTime - block.number);
    }
    function getPercentFeed(uint256 _nodeID) public view returns (uint256){
        return 100 - ((NodeByID[_nodeID].lastFeedTime + NodeByID[_nodeID].FeedingTime * 7 )/ block.number);
    }
    function getHungryAtBlock(uint256 _nodeID) public view returns (uint256){
        return NodeByID[_nodeID].lastFeedTime + NodeByID[_nodeID].FeedingTime;
    }
    function getStarvedAtBlock(uint256 _nodeID) public view returns (uint256){
        return NodeByID[_nodeID].lastFeedTime +(NodeByID[_nodeID].FeedingTime * 7);
    }
    //REPAIR
    //GET

    function getNodeTypeByID(uint256 _Id) public view returns(NodeType memory){
        return nodeTypeByID[_Id];
    }
    function getNodeByID(uint256 _Id) public view returns (NodeEntity memory){
        return NodeByID[_Id];
    }
    function getOwnerOfNode(uint256 _nodeID) public view returns (address){
        return TamaGucci(TamaGucciAddress).ownerOf(_nodeID);
    }
    function getCurrentDailyROI(uint256 _nodeID) public view returns (uint256){
        return TamaGucci(TamaGucciAddress).getPriceOfID(_nodeID) / (NodeByID[_nodeID].currentRewards * 24 hours / 2);
    }
    //Sets

    function setReward(uint256 _nodeType, uint256 _reward) public onlyDevWalletAuthorized{
        nodeTypeByID[_nodeType].Base = _reward;
    }
    function setFeedingTime(uint _nodeType, uint _FeedingTime) public onlyDevWalletAuthorized{
        nodeTypeByID[_nodeType].FeedingTime = _FeedingTime;
    }
    function setRepairPrice(uint256 _nodeTypeID, uint256 _price) public onlyDevWalletAuthorized{
        nodeTypeByID[_nodeTypeID].FeedPrice = _price;
    }
    function setCurrencyAuthorized(address _currency,bool _value) public onlyDevWalletAuthorized{
    currencyAuthorized[_currency] = _value;
    }
    function sendDogeToPayment() public onlyDevWalletAuthorized{
        payable(DevWallet).transfer(address(this).balance);
    }
}