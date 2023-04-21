
const Web3=require('web3')
const express = require('express')
const path = require('path');
const formidable = require('formidable')
const fs = require('fs')
const ipfsClient = require('ipfs-http-client');
const multer = require('multer');
const fileUpload = require('express-fileupload');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express()
const port = 3001

//app.get('/', (req, res) => {
  //res.send('Hello World!')
//})
const ipfs = ipfsClient.create({ host: 'localhost', port: '5001', protocol: 'http' })

//const ipfs = new ipfsClient()


app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "static")));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});


app.post('/upload', async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.file;
    const fileHash = await addFileToIPFS(file.data);
    res.send(`File uploaded successfully! Hash: ${fileHash}`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/download/:hash', async (req, res) => {
  try {
    const fileStream = await getFileStreamFromIPFS(req.params.hash);
    fileStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

async function addFileToIPFS(fileData) {
  const file = { path: 'file.txt', content: fileData };
  const added = await ipfs.add(file);
  return added.cid.toString();
}

async function getFileStreamFromIPFS(hash) {
  const stream = ipfs.cat(hash);
  return stream;
}

app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})
