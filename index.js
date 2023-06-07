require('dotenv').config();
const express = require("express");

const app = express()
const port = process.env.ex_port;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(JSON.stringify({
    version: require("./package.json").version
  }))
})

app.listen(port, () => {
  console.log("Listening on port: ", port);
})