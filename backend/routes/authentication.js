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
const passport = require("../controllers/passport");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await findUser("aweston244@gmail.com");
    // res.json(user);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    // Handle system errors
    if (err) {
      console.error("Login error:", err);
      return res.status(500).send("Login failed");
    }

    // Handle authentication failure (wrong credentials)
    if (!user) return res.status(401).send(info.message);

    console.log("Login successful for:", user.email);
    res.send(`Welcome back, ${user.username}!`);
  })(req, res);
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await createUser(username, email, password);
    console.log(`Welcome to Carpiem, ${newUser.username}!`);
  } catch (error) {    
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0];
      throw new Error(`${field} already exists`);
    }

    console.error(error.message) // catch other errors?
  }
});

// router.post('/logout', (req, res) => {
// });

module.exports = router;
