const express = require("express");
const { Posts } = require("../../constants/dummy/datas/post");
const Post = require("../../models/post");

const router = express.Router();

router.get("/dummy", async (req, res) => {
  let post = Posts;
  let p = await Post.create(post);
  res.send(p);
});

module.exports = router;
