const mongoose = require("mongoose");
const StorySchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  storyType: { type: String },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  postedTime: { type: Date, default: Date.now },
  accessTo: {
    type: String,
    enum: ["all", "close friends", "custom"],
    default: "all",
  },
});

const Story = mongoose.model("Story", StorySchema);
module.exports = Story;
