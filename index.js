import express, { json } from "express";
import DBconnection from "./src/config/db.js";
import blogRouter from "./src/routes/blogRoutes.js";

const app = express();
app.use(json());
const port = process.env.PORT || 3000;

// Database connection
DBconnection()
app.use('/api/v1/blog', blogRouter)

app.listen(port, () => {
   console.log(`Blog API listening at http://localhost:${port}`);
});
