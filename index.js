import express, { json } from "express";
import { readFileSync, stat, writeFile, writeFileSync } from "fs";
import DBconnection from "./src/config/db";

const app = express();
app.use(json());
const port = process.env.PORT || 3000;

// Database connection
DBconnection()


app.listen(port, () => {
   console.log(`Blog API listening at http://localhost:${port}`);
});
