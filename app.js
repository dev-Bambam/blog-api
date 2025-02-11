import express, { json } from "express";
import postRoute from "./routes/blogPostRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
app.use(json());


app.use("/blogapi/v1/posts", postRoute);
app.use("/blogapi/v1/users", userRoute);

export default app;
