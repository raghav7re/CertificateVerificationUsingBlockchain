
const Web3=require('web3')
const express = require('express')
const path = require('path');

const app = express()
const port = 3001

//app.get('/', (req, res) => {
  //res.send('Hello World!')
//})

app.use(express.static(path.join(__dirname, "static")));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})
