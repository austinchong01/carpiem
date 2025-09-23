const express = require("express");
const {
  createUser,
  findUser,
  updateUsername,
  deleteUser,
  createPost,
  findPost,
  updatePost,
  deletePost,
  addFollower,
  deleteFollower,
  addFollowing,
  deleteFollowing,
} = require("../controllers/user");

const router = express.Router();

router.get("/", async (req, res) => {
    updatePost("aweston2@gmail.com", 3, "UPDATED", "UPDATED");
});

module.exports = router;
