const express = require("express");
const router = express.Router();
const {
  create,
  fetchAllPosts,
  likePost,
  deletePost,
  updatePost,
} = require("./../controllers/post.js");
router.post("/create", create);
router.get("/all", fetchAllPosts);
router.patch("/:id", updatePost);
router.patch("/:id/:user/likePost", likePost);
router.delete("/:id", deletePost);
module.exports = router;
