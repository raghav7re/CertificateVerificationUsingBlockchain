import { abicode3,smartcontractadd3 } from "./acc3.js";
//import { web3 } from "./web3.min.js";
//import Web3 from "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js";

//import { ethers } from "./ether.min.js";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const ConnectButton =document.getElementById("ConnectButton")
const AC=document.getElementById("ADCT")
const VC=document.getElementById("VFCT")

console.log(web3.eth.getBlockNumber());
AC.onclick=await AddCertificates;
VC.onclick=await VerifyCertificates;
ConnectButton.onclick=await CheckMetamaskConnection ;


async function CheckMetamaskConnection() {
    if (typeof window.ethereum !== 'undefined') {
 console.log('MetaMask is installed!');
 window.ethereum.request({method:"eth_requestAccounts"})
 
document.getElementById("ConnectButton").innerHTML="Connected!"
}   
} 


 var  contract3= new web3.eth.Contract(abicode3,smartcontractadd3);
  

async function AddCertificates ()
{
    
    ethereum.request({ method: 'eth_requestAccounts' })

    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    let account = accounts[0];
    

    //console.log(ethers.utils.formatEther(bl));
    
    var  contract3= new web3.eth.Contract(abicode3,smartcontractadd3);
    

    try {
        //const balanceOf1 =await contract.balanceOf("0x71d64f058CD062F8c4Ec51c86A8295058Cc0F6C1");
        // let text = "Hello World!"


        await contract3.methods.addCertificate(await sha256d("Cert4"),await sha256d("HackerRank"),await sha256d("1")).send({from:web3.utils.toChecksumAddress(account)},function(err, result){
            console.log(result);
         });

        
        
        
    } catch (error) {
        console.log(error);
        
    }
}

    async function VerifyCertificates ()
{
    

    try {
        //const balanceOf1 =await contract.balanceOf("0x71d64f058CD062F8c4Ec51c86A8295058Cc0F6C1");
        

        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
         let account = accounts[0];


         const hash = await sha256d("Cert1");
         console.log('SHA-256 hash:', hash);
     
         //console.log(ethers.utils.formatEther(bl));
         
         var  contract3= new web3.eth.Contract(abicode3,smartcontractadd3);
         

         await contract3.methods.verifyCertificates(await sha256d("Cert4")).call({from:web3.utils.toChecksumAddress(account)},function(err, result){
            console.log(result);
         });  

        
        let text = "Hello World!"

        const vercert =await contract3.verifyCertificates(ethers.utils.sha256(ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Cert2"))
        ));
        const result =await vercert.wait();
        console.log(result);
        console.log();

    } catch (error) {
    console.log(error);    
    }
}

async function sha256d(data) {
    const buffer = new TextEncoder().encode(data);
    const hash = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return "0x"+hashHex;
  }

function sha256(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const buffer = reader.result;
        const hash = crypto.subtle.digest('SHA-256', buffer);
        hash.then((digest) => {
          const hashArray = Array.from(new Uint8Array(digest));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          resolve(hashHex);
        }).catch((err) => {
          reject(err);
        });
      };
      reader.readAsArrayBuffer(file);
    });
  }
