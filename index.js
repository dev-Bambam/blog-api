import express, { json } from "express";
import { readFileSync, stat, writeFile, writeFileSync } from "fs";

const app = express();
app.use(json());
const port = process.env.PORT || 3000;

// reading in the database
const Database = "./Database/database.json";
const posts = JSON.parse(readFileSync(Database, "utf-8"));

// All about the Blog's Posts

// Blog's Landing page
app.get("/", (req, res) => {
   res.status(200).json({
      status: success,
      count: posts.length,
      data: {
         posts: posts,
      },
   });
});

// Retrieve a list of all blog posts
app.get("/posts", (req, res) => {
   res.status(200).json({
      status: "success",
      count: posts.length,
      data: {
         posts: posts,
      },
   });
});

// Retrieve a single blog post by ID
app.get("/posts/:id", (req, res) => {
   const id = +req.params.id;

   // search out posts from the array using id
   const post = posts.find((post) => post.id === id);

   // check if post is found 
   if (!post) {
      return res.status(404).json({
         status: 'failed',
         message: `can't find the specified blog post id: ${id}`
      })
   }

   // contiues if found
   res.status(200).json({
      status: 'success',
      data: {
         blog: post
      }
   })
});

// Create a new blog post
app.post("/posts", (req, res) => {
   const newId = posts.length + 1;
   const incomingPost = req.body
   const newPost = Object.assign({ id: newId }, incomingPost);

   posts.push(newPost);

   writeFile(Database, JSON.stringify(posts), (err) => {
      if (err) {
         return res.status(500).json({
            status: "Server Error",
         });
      } 

      // send response if no error 
      res.status(201).json({
         status: 'created',
         data: {
            blog: newPost
         }
      })
   });
});

// Update a single blog post by ID
app.put("/posts/:id", (req, res) => {
   const id = +req.params.id;
   const incomingPost = req.body;

   // search out exisiting post
   const existingPost = posts.find((post) => post.id === id);

   // if id not found
   if (!existingPost) {
      return res.status(404).json({
         status: "failed",
         message: `${id} not found`,
      });
   }

   // merge the incoming and the current post object together and assign it back to posts
   const index = posts.indexOf(existingPost);
   const updatedPost = Object.assign(existingPost, incomingPost);
   posts[index] = updatedPost;

   // write into the database
   writeFile(Database, JSON.stringify(posts), (err) => {
      if (err) {
         return res.status(500).json({
            status: "failed",
            message: "internal server error",
         });
      }

      res.status(200).json({
         status: "success",
         data: updatedPost,
      });
   });
});

// patching a post
app.patch("/posts/:id", (req, res) => {
   const id = +req.params.id;
   const incomingPost = req.body;

   // search out existing post
   const existingPost = posts.find((post) => post.id === id);

   // check if id exist
   if (!existingPost) {
      return res.status(404).json({
         status: "failed",
         message: `post with ${id} not found`,
      });
   }

   // merge incoming and existing post together and assign back to the array
   const index = posts.indexOf(existingPost);
   const updatedPost = Object.assign(existingPost, incomingPost);
   posts[index] = updatedPost;

   // write into the database;
   writeFile(Database, JSON.stringify(posts), (err) => {
      if (err) {
         return res.status(500).json({
            status: "failed",
            message: "internal server error",
         });
      }

      res.status(200).json({
         status: "success",
         data: posts,
      });
   });
});

// Delete a single post
app.delete("/posts/:id", (req, res) => {
   const id = req.params.id;
   // search Array
   const index = posts.findIndex((post) => post.id === parseInt(id));

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
