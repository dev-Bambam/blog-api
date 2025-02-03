import express, { json } from "express";
import postRouter from "./routes/blogPostRoute.js";

const app = express();
app.use(json());


app.use("/blogapi/v1/posts", postRouter);
export default app;
