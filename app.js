import express, { json } from "express";
import postRouter from "./routes/blogPostRoute.js";

const app = express();
app.use(json());


app.use("/posts", postRouter);
export default app;
