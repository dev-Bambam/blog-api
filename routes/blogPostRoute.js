import express from "express";
import controllers from './../Controllers/postController.js'

const router = express.Router();

router.route("/:id")
   .get(controllers.getSinglePostHandler)
   .put(controllers.updatePostHandler)
   .patch(controllers.patchPostHandler)
   .delete(controllers.deletePostHandler);
router.route("/").get(controllers.getAllPostsHandler).post(controllers.createPostRouteHandler);
router.route("/").get(controllers.homeHandler);
router.route("/Title/:title").get(controllers.getPostByTitleHandler);
router.get("/:id/comments", controllers.getPostCommentsHandler);
router.post("/:id/comments", controllers.createPostCommentHandler);
router.route("/:id/comments").get(controllers.getPostCommentsHandler).post(controllers.createPostCommentRouteHandler);

module.exports = router;
