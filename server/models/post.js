const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    category: String,
    subject: String,
    description: String,
    location: String,
    date: String,
    link: String,
    company: String,
    image: {},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
