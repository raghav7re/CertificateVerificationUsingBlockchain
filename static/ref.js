import { ethers } from "./ether.min.js";
import { abicode,smartcontractadd } from "./acc.js";

const ConnectButton =document.getElementById("ConnectButton")
const balance =document.getElementById("balanceof")
const ConnectTotalsupply =document.getElementById("totalsupply")

ConnectButton.onclick=await CheckMetamaskConnection ;
balance.onclick=balanceOf ;
ConnectTotalsupply.onclick=totalSupply;

 async function CheckMetamaskConnection() {
    if (typeof window.ethereum !== 'undefined') {
 console.log('MetaMask is installed!');
 window.ethereum.request({method:"eth_requestAccounts"})
 
document.getElementById("ConnectButton").innerHTML="Connected!"
}   
} 


async function balanceOf ()
{
    
    ethereum.request({ method: 'eth_requestAccounts' })

    const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
    await provider.send("eth_requestAccounts", []);

    const signer =provider.getSigner();
    console.log(signer);
    var bl =provider.getBalance("ethers.eth");
    console.log(provider.getBlockNumber());

    //console.log(ethers.utils.formatEther(bl));
    
    var contract= new ethers.Contract(smartcontractadd,abicode,provider); 
    try {
        //const balanceOf1 =await contract.balanceOf("0x71d64f058CD062F8c4Ec51c86A8295058Cc0F6C1");
        const balance =await contract.totalSupply();
        console.log(ethers.utils.formatUnits(balance, 2));
        console.log();

    } catch (error) {
        
    }
}

async function totalSupply ()
{
    
    ethereum.request({ method: 'eth_requestAccounts' })

    const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
    await provider.send("eth_requestAccounts", []);

    const signer =provider.getSigner();
    console.log(signer);
    var bl =provider.getBalance("ethers.eth");
    console.log(provider.getBlockNumber());

    //console.log(ethers.utils.formatEther(bl));
    
    var contract= new ethers.Contract(smartcontractadd,abicode,provider); 
    try {
        //const balanceOf1 =await contract.balanceOf("0x71d64f058CD062F8c4Ec51c86A8295058Cc0F6C1");
        const balance =await contract.totalSupply();
        console.log(ethers.utils.formatUnits(balance, 2));
        console.log();

    } catch (error) {
        
    }
}


  