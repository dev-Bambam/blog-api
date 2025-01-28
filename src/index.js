import express, { json } from "express";
import DBconnection from "./config/db.js";
import router from "./routes/blogRoutes.js";

const app = express();
app.use(json());
const port = process.env.PORT || 3000;

// Database connection
DBconnection()
app.use('/api/v1/blog', router)

app.listen(port, () => {
   console.log(`Blog API listening at http://localhost:${port}`);
});
