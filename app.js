import express, { json } from "express";
import { readFileSync, stat, writeFile, writeFileSync } from "fs";
import DBconnection from "./src/config/db";

const app = express();
app.use(json());

// All about the Blog's Posts

// Blog's Landing page
app.get("/", (req, res) => {
   res.status(200).json({
      status: "success",
      count: posts.length,
      data: {
         posts: "welcome to my blog's landing page",
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
         status: "failed",
         message: `can't find the specified blog post id: ${id}`,
      });
   }

   // contiues if found
   res.status(200).json({
      status: "success",
      data: {
         blog: post,
      },
   });
});

// to get post by title
app.get("/posts/Title/:title", (req, res) => {
   const title = req.params.title;

   // search title from database
   const post = posts.find((post) => post.title === title);

   // check if post is found
   if (!post) {
      return res.status(404).json({
         status: "failed",
         message: `can't find the specified blog post id: ${id}`,
      });
   }

   // contiues if found
   res.status(200).json({
      status: "success",
      data: {
         blog: post,
      },
   });
});

// Create a new blog post
app.post("/posts", (req, res) => {
   const newId = posts.length + 1;
   const incomingPost = req.body;
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
         status: "created",
         data: {
            blog: newPost,
         },
      });
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
         data: updatedPost,
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

// ALl about comments

// GET /posts/{id}/comments: Retrieve a list of comments for a single blog post
// POST /posts/{id}/comments: Create a new comment for a single blog post
// GET /comments/{id}: Retrieve a single comment by ID
// PUT /comments/{id}: Update a single comment by ID
// DELETE /comments/{id}: Delete a single comment by ID

// retrieve a list of comments for a single blog post
app.get("/posts/:id/comments", (req, res) => {
   const id = +req.params.id;

   // search for the post using the id
   const searchedPost = posts.find((post) => post.id === id);

   // if post wasn't found
   if (!searchedPost) {
      return res.status(404).json({
         status: `failed`,
         message: "blog post not found",
      });
   }

   // continue if post was found
   const comments = searchedPost.comments;

   // send response
   return res.status(200).json({
      status: "sucess",
      counts: comments.length,
      data: {
         comment: comments,
      },
   });
});

// create a comment for a single blog post
app.post("/posts/:id/comments", (req, res) => {
   const id = +req.params.id;
   let incomingComment = req.body;
   const Post = posts.find((post) => post.id === id);
   const index = posts.indexOf(Post);

   // if post wasn't found
   if (!Post) {
      return res.status(404).json({
         status: "failed",
         message: `can't find post with the id: ${id}`,
      });
   }

   // continue if post was found

   // assign id to the incoming comment and push the post comment array
   const newId = Post.comments.length + 1;
   incomingComment = Object.assign({ id: newId }, incomingComment);
   Post.comments.push(incomingComment);
   posts[index] = Post;

   // write into the database
   try {
      writeFile(Database, JSON.stringify(posts), (err) => {
         if (err) {
            return res.status(500).json({
               status: "failed",
               message: "internal server error",
            });
         }

         // continues if no error
         return res.status(201).json({
            status: "created",
            data: {
               incomingComment: incomingComment,
               post: Post,
            },
         });
      });
   } catch (error) {
      console.error(error);
   }
});

// GET /comments/{id}: Retrieve a single comment of a post by id
app.get("/posts/:id/comments/:id", (req, res) => {});
