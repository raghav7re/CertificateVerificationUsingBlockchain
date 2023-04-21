import { abicode3,smartcontractadd3 } from "./acc3.js";
//import { web3 } from "./web3.min.js";

import { ethers } from "./ether.min.js";

const ConnectButton =document.getElementById("ConnectButton")
const AC=document.getElementById("ADCT")
const VC=document.getElementById("VFCT")

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

async function AddCertificates ()
{
    
    ethereum.request({ method: 'eth_requestAccounts' })

    //const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer =provider.getSigner();
    console.log(signer);
    //var bl =provider.getBalance("ethers.eth");
    console.log(provider.getBlockNumber());

    //console.log(ethers.utils.formatEther(bl));
    
    var contract3= new ethers.Contract(smartcontractadd3,abicode3,signer);
    

    try {
        //const balanceOf1 =await contract.balanceOf("0x71d64f058CD062F8c4Ec51c86A8295058Cc0F6C1");
        // let text = "Hello World!"

        // let ex = ethers.utils.sha256(text);
        console.log(ethers.utils.sha256(ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Cert2"))
        ));
        const addcert =await contract3.addCertificate(ethers.utils.sha256(ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Cert2"))
        ),ethers.utils.sha256(ethers.utils.hexlify(ethers.utils.toUtf8Bytes("hackerRank"))
        ),ethers.utils.sha256(ethers.utils.hexlify(ethers.utils.toUtf8Bytes("1"))
        ));
        addcert.wait();
        console.log(addcert);
        console.log();

    } catch (error) {
        console.log(error);
        
    }
}

    async function VerifyCertificates ()
{
    
    ethereum.request({ method: 'eth_requestAccounts' })

    const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
    await provider.send("eth_requestAccounts", []);

    const signer =provider.getSigner();
    console.log(signer);
    //var bl =provider.getBalance("ethers.eth");
    //console.log(provider.getBlockNumber());

    //console.log(ethers.utils.formatEther(bl));
    
    var contract3= new ethers.Contract(smartcontractadd3,abicode3,signer);
    

    try {
        //const balanceOf1 =await contract.balanceOf("0x71d64f058CD062F8c4Ec51c86A8295058Cc0F6C1");
        let text = "Hello World!"

        let ex = ethers.utils.sha256(text)
        const vercert =await contract3.verifyCertificates(ethers.utils.sha256(ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Cert2"))
        ));
        const result =vercert.wait();
        console.log(result);
        console.log();

    } catch (error) {
        
    }
}

