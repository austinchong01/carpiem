const express = require("express");
const {
  createUser,
  findUser,
  updateUsername,
  deleteUser,
  createPost,
  deletePost,
  addFollower,
  deleteFollower,
  addFollowing,
  deleteFollowing,
} = require("../controllers/user");

const router = express.Router();

router.get("/", async (req, res) => {
    deleteFollowing("one@gmail.com", "two@gmail.com");
});

module.exports = router;
