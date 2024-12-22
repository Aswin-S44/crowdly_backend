const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, default: "image" },
  url: { type: String, required: true },
  likeCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  caption: { type: String },
  postedTime: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
