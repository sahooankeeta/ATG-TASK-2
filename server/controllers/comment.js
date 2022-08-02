const Post = require("./../models/post.js");
const Comment = require("./../models/comment.js");
const User = require("./../models/user.js");
const mongoose = require("mongoose");
module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post).populate("user");
    if (post) {
      let comment = await Comment.create({
        content: req.body.comment,
        post: req.body.post,
        user: req.body.user,
      });
      post.comments.push(comment);
      await post.save();
      let finalpost = await Post.findById(req.body.post)
        .populate("user")
        .populate({
          path: "comments",
          populate: {
            path: "user",
          },
        });
      // console.log(post);
      res.status(200).json(finalpost);
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: err.message });
  }
};
