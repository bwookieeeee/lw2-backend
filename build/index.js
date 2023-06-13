"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv");
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
// Set defaults
const port = process.env.EX_PORT ? process.env.EX_PORT : 3000;
const databaseUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL : "postgresql://localhost";
const version = process.env.LW2_VERSION ? process.env.LW2_VERSION : "0.0.0";
const app = (0, express_1.default)();
const client = new pg_1.Pool({
    connectionString: databaseUrl
});
app.use(express_1.default.json());
app.get('/', (req, res) => {
    console.log("GET /");
    res.json({
        version: version
    });
});
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`GET /user ${req.body.target}`);
    try {
        const target = req.body.target;
        const q = yield client.query("SELECT * FROM USERS WHERE email=$1::text LIMIT 1", [target]);
        const t = q.rows[0];
        res.status(200).json({
            id: t.id,
            pwHash: t.pw_hash,
            email: t.email,
            permissions: t.permissions,
            firstName: t.first_name,
            lastName: t.last_name,
        });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}));
app.listen(port, () => {
    return console.log(`express is listening on ${port}`);
});
//# sourceMappingURL=index.js.map