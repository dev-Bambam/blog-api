import express from "express";

const router = express.Router();

router.route("/:id")
   .get(getSinglePostRouteHandler)
   .put(updatePostRouteHandler)
   .patch(patchPostRouteHandler)
   .delete(deletePostRouteHandler);
router.route("/").get(getAllPostsRouteHandler).post(createPostRouteHandler);
router.route("/").get(homeRouteHandler);
router.route("/Title/:title").get(getPostByTitleRouteHandler);
router.get("/:id/comments", getPostCommentsRouteHandler);
router.post("/:id/comments", createPostCommentRouteHandler);
router.route("/:id/comments").get(getPostCommentsRouteHandler).post(createPostCommentRouteHandler);

module.exports = router;
