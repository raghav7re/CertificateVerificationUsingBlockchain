import { create, urlSource } from 'ipfs';

const ipfs = await create()

const file1 = await ipfs.add(urlSource('https://ipfs.io/images/ipfs-logo.svg'))
console.log(file1)

var sha256File = require('sha256-file');

const ipsum =document.getElementById("ipfssubmit")
ipsum.onclick=ipfun();
let file = document.getElementById('input').files[0];

let formData = new FormData();




formData.append('file', file);
fetch('/upload/image', {method: "POST", body: formData});
console.log(sha256File(file));
console.log('ref1');


async function ipfun()
{
    console.log('hi');
    //const { cid } = await ipfs.add('Hello world')
    console.log(cid);
}
