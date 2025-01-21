import express, { json } from "express";
import { readFileSync, writeFile, writeFileSync } from "fs";

const app = express();
app.use(json());
const port = process.env.PORT || 3000;

// reading in the database
const posts = JSON.parse(readFileSync("./Database/database.json", "utf-8"));

// All about the Blog's Posts
// Blog's Landing page
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to Bambam's Blog Page",
  });
});

// Retrieve a list of all blog posts
app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

// Retrieve a single blog post by ID
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    res.status(404).send({
      message: "NOT FOUND",
    });
  } else {
    res.status(200).send(post);
  }
});

// Create a new blog post
app.post("/posts", (req, res) => {
  const post = req.body;
  posts.push(post);
  const updatedPosts = JSON.stringify(posts);

  try {
    writeFileSync("./Database/database.json", updatedPosts);
    res.status(200).send({
      message: "post added successfully",
    });
  } catch (error) {
    console.error(error.message);
  }
});

// Update a single blog post by ID
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  let post = req.body;
  console.log(post);

  // search Array of posts
  const index = posts.findIndex((post) => post.id === parseInt(id));

  if (index !== -1) {
    posts[index] = post;
    const updatedPosts = JSON.stringify(posts);

    // writig into the Array
    try {
      writeFileSync("./Database/database.json", updatedPosts);
    } catch (error) {
      console.error(error.message);
    }
    res.json({
      message: "post updated sucessfully",
    });
  } else {
    res.status(404).json({
      message: "bad request",
    });
  }
});

// Delete a single post
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  // search Array
  const index = posts.findIndex(post => post.id === parseInt(id));

  if (index !== -1) {
    posts.splice(index, 1);
    const updatedPosts = JSON.stringify(posts);
    try {
      writeFileSync("./Database/database.json", updatedPosts);
    } catch (error) {
      console.error(error.message);
    }
    res.json({
      message: "post deleted successfully",
    });
  } else {
    res.status(404).json({
      message: "bad request",
    });
  }
});
app.listen(port, () => {
  console.log(`Blog API listening at http://localhost:${port}`);
});
