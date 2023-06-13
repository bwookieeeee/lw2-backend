import "dotenv";
import express, { Application } from "express";
import { Pool, QueryResult } from "pg";

// Set defaults
const port: number = process.env.EX_PORT ? process.env.EX_PORT as unknown as number : 3000;
const databaseUrl: string = process.env.DATABASE_URL ? process.env.DATABASE_URL as string : "postgresql://localhost";
const version: string = process.env.LW2_VERSION ? process.env.LW2_VERSION as string : "0.0.0";


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

app.get("/user", async (req, res) => {
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

app.listen(port, () => {
  return console.log(`express is listening on ${port}`)
})