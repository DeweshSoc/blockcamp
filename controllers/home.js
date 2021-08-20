const Blockchain = require("../models/blockchain");
let blockchains = [];
exports.getHome = (req,res)=>{
    res.render("home");
}

exports.getChains = (req,res)=>{
    res.send(JSON.stringify(blockchains));
}

exports.getCreateBlockchain = (req,res)=>{
    const blockchain = new Blockchain;
    blockchains.push(blockchain);
    console.log("Created new chain");
    res.redirect("/chains");
}

exports.getMineBlock = (req,res)=>{
    const idx = req.params.blockchainIndex;
    const blockchain = blockchains[idx-1];
    const lastBlock = blockchain.getLastBlock();
    const lastBlockProof = lastBlock.proof;
    const lastBlockHash =  lastBlock.hash;
    console.log(lastBlockProof);
    const newProof = blockchain.proofOfWork(lastBlockProof);
    console.log(newProof);
    const newBlock = blockchain.createBlock(newProof,lastBlockHash);
    console.log(newBlock);
    console.log("block added");
    res.send(JSON.stringify(newBlock));
}