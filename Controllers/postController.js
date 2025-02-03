import mongoose from "mongoose";
import Blog from "./../models/blogModel.js";

// Route handlers middleware functions

/**
 * Handles GET / request. Returns a welcome message and the number of blog posts available.
 * @param {IncomingMessage} req - The request object.
 * @param {ServerResponse} res - The response object.
 * @returns {void}
 * @throws {undefined} No error is thrown.
 */
export const homeHandler = (req, res) => {
   res.status(200).json({
      status: "success",
      count: posts.length,
      data: {
         posts: "welcome to my blog's landing page",
      },
   });
};

/**
 * Handles GET /posts request. Returns all blog posts.
 * @param {IncomingMessage} req - The request object.
 * @param {ServerResponse} res - The response object.
 * @returns {void}
 * @throws {undefined} No error is thrown.
 */
export const getAllPostsHandler = async (req, res) => {
   try {
      const posts = await Blog.find({});

      if (!posts) {
         return res.status(404).json({
            status: "fail",
            message: "No blog post yet",
         });
      }

      return res.status(200).json({
         status: "success",
         count: posts.length,
         data: {
            posts,
         },
      });
   } catch (error) {
      res.status(500).json({
         status: "fail",
         message: error.message,
      });
   }
};

export const getSinglePostHandler = async (req, res) => {
   try {
      const postId = req.params.id;

      if (!mongoose.isValidObjectId(postId)) {
         return res.status(400).json({
            status: "fail",
            message: "invalid object id",
         });
      }

      const post = await Blog.findById(postId);

      if (!post) {
         return res.status(404).json({
            status: "fail",
            message: "Blog post not found",
         });
      }

      return res.status(200).json({
         status: "success",
         data: {
            post,
         },
      });
   } catch (error) {
      res.status(500).json({
         status: "fail",
         message: error.message,
      });
   }
};

export const getPostByTitleHandler = async (req, res) => {
   try {
      const postTitle = req.params.title;

      const post = await Blog.findOne({ title: postTitle });

      if (!post) {
         return res.status(404).json({
            status: "fail",
            message: "post not found",
         });
      }

      return res.status(200).json({
         status: 'success',
         data: {
            post
         }
      })
   } catch (error) {
      res.status(500).json({
         status: "fail",
         message: error.message,
      });
   }
};

export const createPostHandler = async (req, res) => {
   try {
      const incomingPost = req.body;
      const post = new Blog(incomingPost);

      await post.save();

      res.status(200).json({
         status: 'success',
         data: {
            post
         }
      })
   } catch (error) {
      res.status(400).json({
         status: 'error',
         message: error.message
      })
   }
};

export const updatePostHandler = (req, res) => {
   
};

export const patchPostHandler = (req, res) => {
 
};

export const deletePostHandler = (req, res) => {
   
};

export const getPostCommentsHandler = (req, res) => {
   
};

export const createPostCommentHandler = (req, res) => {
   
};
