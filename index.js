require('dotenv').config();
const express = require("express");
const uuid = require("uuid");
const Client = require("pg").Client;
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.CA_CERT
}
})

const app = express()
const port = process.env.EX_PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    version: require("./package.json").version
  })
})


app.get('/user', async (req, res) => {
  console.log("got user request");
  // TODO: authorization
  try {

    client.connect();
    const ret = await client.query("SELECT * FROM users WHERE email=$1::text LIMIT 1", [req.body.target]);
    client.end();

    const t = ret.rows[0];
    res.status(200).json({
      id: t.id,
      pwHash: t.pw_hash,
      email: t.email,
      permissions: t.permissions,
      firstName: t.first_name,
      lastName: t.last_name
    })
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
})

app.post('/user/create', (req, res) => {
  const body = JSON.parse(req.body);

})

app.listen(port, () => {
  console.log(`Listening on ${process.env.CONSOLE_URL}:${port}`);
})
