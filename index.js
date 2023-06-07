require('dotenv').config();
const express = require("express");
const uuid = require("uuid");

const app = express()
const port = process.env.EX_PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.json(JSON.stringify({
    version: require("./package.json").version
  }))
})

app.post('/users/create', (req, res) => {
  const body = JSON.parse(req.body);
  
})

app.listen(port, () => {
  console.log("Listening on port: ", port);
})