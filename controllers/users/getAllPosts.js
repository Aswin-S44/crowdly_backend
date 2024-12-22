const { HttpStatus } = require("../../constants/https");
const Post = require("../../models/post");

module.exports.getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const posts = await Post.find()
      .populate("userId", "username")
      .skip(skip)
      .limit(parseInt(limit));
    return res.status(HttpStatus.OK).send(posts);
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Error while fetching posts",
      data: error,
    });
  }
};
