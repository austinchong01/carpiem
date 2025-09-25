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
    // addFollower("aweston2@gmail.com", "two@gmail.com");
});



router.get("/login", async (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    console.log(res.email, res.password)
});


router.get("/register", async (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    
});



// router.post('/logout', (req, res) => {
// });

module.exports = router;
