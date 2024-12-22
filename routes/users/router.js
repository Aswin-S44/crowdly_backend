const express = require("express");
const { SignUp } = require("../../controllers/users/signUp");
const { SignIn } = require("../../controllers/users/signIn");
const { getAllPosts } = require("../../controllers/users/getAllPosts");
const { getProfile } = require("../../controllers/users/getProfile");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User router called");
});

router.post("/sign-up", SignUp);
router.post("/sign-in", SignIn);
router.get("/post/all", getAllPosts);
router.get('/profile/:id',getProfile)

module.exports = router;
