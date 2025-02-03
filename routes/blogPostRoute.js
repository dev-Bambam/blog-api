/**
 * This module contains all the route handlers for the blog posts.
 * The route handlers are grouped by HTTP method and route path.
 * The route handlers are imported from the controllers module.
 * The router is exported as the default export of the module.
 */
import express from "express";
import * as controllers from './../Controllers/postController.js'

const router = express.Router();
// using params middleware

router.route("/:id")
   .get(controllers.getSinglePostHandler)
   .put(controllers.updatePostHandler)
   .patch(controllers.patchPostHandler)
   .delete(controllers.deletePostHandler);
router.route("/").get(controllers.getAllPostsHandler).post(controllers.createPostHandler);
router.route("/").get(controllers.homeHandler);
router.route("/Title/:title").get(controllers.getPostByTitleHandler);
router.get("/:id/comments", controllers.getPostCommentsHandler);
router.post("/:id/comments", controllers.createPostCommentHandler);
router.route("/:id/comments").get(controllers.getPostCommentsHandler).post(controllers.createPostCommentHandler);

export default router;

