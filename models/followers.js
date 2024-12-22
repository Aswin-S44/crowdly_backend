const mongoose = require("mongoose");

const followersSchema = mongoose.Schema({
  followerId: { type: String, required: true },
  followingId: { type: String, required: true },
  actionDate: { type: Date, default: Date.now },
});

const FollowerData = mongoose.model("FollowerData", followersSchema);
module.exports = FollowerData;
