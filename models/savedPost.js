const mongoose = require("mongoose");

const SavedPostSchema = mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isAvailable: { type: Boolean, default: true },
});

const SavedPost = mongoose.model("Saved", SavedPostSchema);
module.exports = SavedPost;
