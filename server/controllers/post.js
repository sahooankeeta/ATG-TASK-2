const Post = require("./../models/post.js");
const Comment = require("./../models/comment.js");
const User = require("./../models/user.js");
const cloudinary = require("./../utils/cloudinary.js");
const mongoose = require("mongoose");
module.exports.create = async (req, res) => {
  try {
    let post = await Post.create(req.body);

    console.log(post);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: err.message });
  }
};
module.exports.fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    res.status(200).json(posts);
    //return;
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: err.message });
  }
};
module.exports.likePost = async (req, res) => {
  const { id, user } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(200).json({ error: `No post with id: ${id}` });

  const post = await Post.findById(id);

  const index = post.likes.findIndex((i) => i === user);

  if (index === -1) {
    post.likes.push(user);
  } else {
    post.likes = post.likes.filter((id) => id !== user);
  }

  const updatedPost = await Post.findByIdAndUpdate(id, post, {
    new: true,
  })
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
  // console.log(updatedPost);
  res.status(200).json(updatedPost);
};
module.exports.deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(200).json({ error: `No post with id: ${id}` });
  await Comment.deleteMany({ post: id });
  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};
module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const {
    company,
    location,
    date,
    category,
    subject,
    image,
    description,
    user,
    likes,
    comments,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(200).json({ error: `No post with id: ${id}` });

  const updatedPost = {
    company,
    location,
    date,
    category,
    subject,
    image,
    description,
    user,
    likes,
    comments,
    _id: id,
  };

  await Post.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};
