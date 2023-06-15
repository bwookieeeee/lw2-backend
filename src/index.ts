import "dotenv";
import express, { Application } from "express";
import { Pool, QueryResult } from "pg";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";


// Set defaults
const port: number = process.env.EX_PORT as unknown as number || 3000;
const databaseUrl: string = process.env.DATABASE_URL as string || "postgresql://localhost";
const version: string = process.env.LW2_VERSION as string || "0.0.0";


const app: Application = express();
const client = new Pool({
  connectionString: databaseUrl
})

app.use(express.json());

app.get('/', (req, res) => {
  console.log("GET /");
  res.json({
    version: version
  });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    console.error(err);
    if (err) return res.sendStatus(403);
    req.user=user;
    next();
  })
}

app.get("/authenticate", async (req, res, next) => {
  const { email, pwHash } = req.body;
  let usr;
  try {
    const q = await client.query("SELECT * FROM users WHERE email=$1::text LIMIT 1", [email]);
    if (q.rows.length > 0 && q.rows[0].pw_hash === pwHash) {
      usr = q.rows[0];
    } else {
      const error = Error("Username or password is incorrect");
      return next(error);
    }
  } catch (e) {
    console.error(e);
    return next(e);
  }
  let token;
  try {
    token = jwt.sign(
      {
        id: usr.id,
        email: usr.email,
        permissions: usr.permissions
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h"
      }
    )
  } catch (e) {
    console.error(e);
    return next(e);
  }

  res.status(200).json(
    {
      id: usr.id,
      email: usr.email,
      token: token
    }
  )
})

app.get("/user", authenticateToken, async (req, res) => {
  console.log(`GET /user ${req.body.target}`);
  try {
    const target: string = req.body.target;
    const q: QueryResult = await client.query("SELECT * FROM USERS WHERE email=$1::text LIMIT 1", [target]);
    const t = q.rows[0];
    res.status(200).json({
      id: t.id,
      pwHash: t.pw_hash,
      email: t.email,
      permissions: t.permissions,
      firstName: t.first_name,
      lastName: t.last_name,
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
})

app.post("/user", async (req, res) => {
  console.log(`POST /user ${req.body.email}`);
  const id: string = v4();
  const email: string = req.body.email;
  const pwHash: string = req.body.pwHash;
  const permissions: number = req.body.permissions || 0;
  const firstName: string = req.body.firstName;
  const lastName: string | null = req.body.lastName || null;

  try {
    const q: QueryResult = await client.query("INSERT INTO users (id, email, pw_hash, permissions, first_name, last_name) VALUES ($1,$2,$3,$4,$5,$6)", [
      id, email, pwHash, permissions, firstName, lastName
    ]);
    res.status(201).json({
      id: id,
      email: email,
      pwHash: pwHash,
      permissions: permissions,
      firstName: firstName,
      lastName: lastName
    })
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
})

app.listen(port, () => {
  return console.log(`express is listening on ${port}`)
})