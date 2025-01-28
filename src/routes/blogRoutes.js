import express, { response, json } from "express";
import BlogModel from "../models/blogModel.js";

const router = express.Router();
application.use(json());

// defining routes
router.get("/", (req, res) => {
   res.send("Welcome to the home page, blogs will be available soon");
});

router.post("/", (req, res) => {
   let blog = new BlogModel();

   blog
      .save()
      .then((data) => res.send("Blog saved successfully"))
      .catch((err) => res.send("An error occured"));
});

export default router;
