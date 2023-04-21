import { ethers } from "./ether.min.js";
//import { Web3 } from "./web3.min.js";
import { abicode,smartcontractadd } from "./acc.js";
import { abicode3,smartcontractadd3 } from "./acc3.js";

const ConnectButton =document.getElementById("ConnectButton")
const balance =document.getElementById("balanceof")
const ConnectTotalsupply =document.getElementById("totalsupply")
const transferbutton=document.getElementById("transfer")
const hashfile =document.getElementById("myfile")

ConnectButton.onclick=await CheckMetamaskConnection ;
balance.onclick=balanceOf ;
ConnectTotalsupply.onclick=totalSupply;
transferbutton.onclick=transfer(this);
hashfile.onclick=onMyfileChange(this);

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
    var contract3= new ethers.Contract(smartcontractadd3,abicode3,provider);
    

    try {
        //const balanceOf1 =await contract.balanceOf("0x71d64f058CD062F8c4Ec51c86A8295058Cc0F6C1");
        const balance =await contract.totalSupply();
        console.log(ethers.utils.formatUnits(balance, 2));
        console.log();

    } catch (error) {
        
    }
}

async function transfer (addres)
{
    
    ethereum.request({ method: 'eth_requestAccounts' })

    const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
    await provider.send("eth_requestAccounts", []);

    const signer =provider.getSigner();
    console.log(signer);
    var bl =provider.getBalance("ethers.eth");
    //console.log(provider.getBlockNumber());

    //console.log(ethers.utils.formatEther(bl));
    
    var contract= new ethers.Contract(smartcontractadd,abicode,provider); 
    try {
        //const balanceOf1 =await contract.balanceOf("0x71d64f058CD062F8c4Ec51c86A8295058Cc0F6C1");
        const balance =await contract.Transfer(ethers.utils.getAddress(addres));
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

    function onMyfileChange(fileInput) {
        if(fileInput.files[0] == undefined) {
            return ;
        }
        var filename = fileInput.files[0].name;
        // var filesize = fileInput.files[0].size;
        var reader = new FileReader();
        reader.onload = function(ev) {
            console.log("File", filename, ":");
            // 
            crypto.subtle.digest('SHA-256', ev.target.result).then(hashBuffer => {
                // Convert hex to hash, see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
                console.log(hashHex);
            }).catch(ex => console.error(ex));
        };
        reader.onerror = function(err) {
            console.error("Failed to read file", err);
        }
        reader.readAsArrayBuffer(fileInput.files[0]);
    }

}


  