const shajs = require("sha.js");

class Blockchain{
     
    constructor(){
        this.chain = [];
        this.createBlock(1,'0'); //genesisblock
    }

    createBlock(proof,previousHash){ // after getting the hash this function is called
        const date = new Date();
        const block = {
            index:this.chain.length+1,
            timestamp:date.toLocaleString(),
            proof:proof,
            previousHash:previousHash
        }
        const currentHash = this.getHash(block);
        block.hash = currentHash;
        this.chain.push(block);
        return block;
    }

    getLastBlock(){
        return this.chain[this.chain.length-1];
    }

    proofOfWork(previousProof){
        let newProof = 1;
        let validProof = false;
        while(!validProof){
            const someFunction = newProof**2 - previousProof**2; //non-symmetric
            const hashOperation = shajs("sha256").update(someFunction.toString()).digest("hex");
            const checkString = hashOperation.slice(0,4);
            if(checkString=="0000"){
                validProof = true;
            }else{
                newProof++;
            }
        }
        return newProof
    }
    getHash(block){
        const encodedBlock = JSON.stringify(block);
        return shajs("sha256").update(encodedBlock).digest("hex");
    }

    isChainValid(){
        let previousBlock = this.chain[0];
        let idx = 1;
        while(idx<this.chain.length){
            const currentBlock = this.chain[idx];
            if(currentBlock.previousHash!=this.getHash(previousBlock)){
                return false;
            }
            const previousProof = previousBlock.proof;
            const currentProof = currentBlock.proof;
            const someFunction = currentProof**2 - previousProof**2; //non-symmetric
            const hashOperation = shajs("sha256").update(someFunction.toString()).digest("hex");
            const checkString = hashOperation.splice(0,4);
            if(checkString!="0000"){
                return false;
            }

            previousBlock = currentBlock;
            idx++;
        }
        return true;
    }

};

module.exports = Blockchain;