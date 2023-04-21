import ipfsClient from 'ipfs-http-client';


const ipsum =document.getElementById("ipfssubmit");
ipsum.onclick=uploadFile;


const ipdown =document.getElementById("downloadFile");
ipdown.onclick=downloadFile;
document.onload=downloadFile;
let rfile = document.getElementById('input').files[0];

const ipfs = ipfsClient('http://localhost:5001');


let ipfsHash;

async function uploadFile() {
  const fileInput = document.querySelector('input[type=file]');
  const file = fileInput.files[0];
  const added = await ipfs.add(rfile);
  ipfsHash = added.cid.toString();
  console.log(`File uploaded to IPFS with hash ${ipfsHash}`);
}

async function downloadFile() {
  if (!ipfsHash) {
    console.error('No IPFS hash available for download');
    return;
  }
  const res = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ipfs-file-${ipfsHash}.txt`;
  link.click();
}