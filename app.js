import express, { json } from "express";
import postRouter from './routes/blogPostRoute.js'

const app = express();
app.use(json());

const port = 3000;

app.use('/posts', postRouter)
app.listen(port, () => {
   console.log(`Blog API listening at http://localhost:${port}`);
});
