const mongoose = require("mongoose");
const Notifications = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["follow_request", "following", "added_post"] },
  notificationTime: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notifications", Notifications);
module.exports = Notification;
