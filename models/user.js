const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, trim: true, unique: true },
  phone: { type: String, required: true, unique: true, match: /^\d{10,15}$/ },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  bio: { type: String, maxlength: 160, default: "" },
  accountDeleted: { type: Boolean, default: false },
  accountCreated: { type: Date, default: Date.now },
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  interests: [{ type: String }],
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  privateAccount: { type: Boolean, default: false },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  lastActive: { type: Date, default: Date.now },
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  ],
  status: { type: String, maxlength: 100, default: "" },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
