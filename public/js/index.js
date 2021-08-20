const createBtn = document.getElementById("create-btn");
const mineBtn = document.getElementById("mine-btn");
const block = document.getElementById("block-template");
const blockchain = document.getElementById("bc-template");
const bcContainer = document.getElementById("bc-container");

const notice = (header,info)=>{
    const overlay = document.getElementById("notice-overlay");
    overlay.firstElementChild.firstElementChild.innerHTML = header;
    overlay.firstElementChild.lastElementChild.innerHTML = info;
    overlay.classList.remove("hide");
    setTimeout(()=>{
        overlay.classList.add("hide");
    },1000);
}

const renderAllChains = (blockchains)=>{
    let i=1;
    bcContainer.innerHTML = "";
    blockchains.forEach(bc => {
        const newBlockchain = blockchain.content.cloneNode(true);
        newBlockchain.querySelector("h2 span").innerHTML = i;
        bc.chain.forEach(blk=>{
            const newBlock = block.content.cloneNode(true);
            newBlock.firstElementChild.querySelector("#block-index").innerHTML += blk.index;
            newBlock.firstElementChild.querySelector("#timestamp").innerHTML += blk.timestamp;
            newBlock.firstElementChild.querySelector("#proof").innerHTML += blk.proof;
            newBlock.firstElementChild.querySelector("#p-hash").innerHTML += blk.previousHash;
            newBlock.firstElementChild.querySelector("#block-hash").innerHTML += blk.hash;
            newBlockchain.querySelector(".row").appendChild(newBlock);
        })
        bcContainer.appendChild(newBlockchain);
        i++;
    });
}

window.onload = ()=>{
    console.log("loading...");
    fetch("/chains")
    .then(res=>{
        return res.json();
    })
    .then(blockchains=>{
        renderAllChains(blockchains);
    })
    .catch(err=>console.log(err));
};

const addNewChain = ()=>{
    fetch("/createBlockchain")
    .then(res=>{
        return res.json();
    })
    .then((blockchains)=>{
        renderAllChains(blockchains);
        notice("New blockchain created","Scroll down");
    })
    .catch(err=>console.log(err));
}

const renderNewBlk = (blk,blkChainRow)=>{
    const newBlock = block.content.cloneNode(true);
    newBlock.firstElementChild.querySelector("#block-index").innerHTML += blk.index;
    newBlock.firstElementChild.querySelector("#timestamp").innerHTML += blk.timestamp;
    newBlock.firstElementChild.querySelector("#proof").innerHTML += blk.proof;
    newBlock.firstElementChild.querySelector("#p-hash").innerHTML += blk.previousHash;
    newBlock.firstElementChild.querySelector("#block-hash").innerHTML += blk.hash;
    blkChainRow.appendChild(newBlock);
}
const mineBlock = (blkchainIdx,blkChainRow)=>{
    const url = `/mineBlock/${blkchainIdx}`;
    fetch(url)
    .then(res=>{
        return res.json();
    })
    .then(blk=>{
        renderNewBlk(blk,blkChainRow);
    })
    .catch(err=>console.log(err));
}


createBtn.addEventListener("click",addNewChain);
bcContainer.addEventListener("click",(event)=>{
    if(event.target.tagName === "BUTTON"){
        const blkChain = event.target.closest("div.blockchain");
        const blkchainRow = blkChain.lastElementChild;
        const blkchainIndex = blkChain.querySelector("h2 span").innerHTML;
        mineBlock(blkchainIndex,blkchainRow);
    }
});