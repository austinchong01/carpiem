const express = require("express");
const user = require("../controllers/user");
const passport = require("../controllers/passport");
const { generateToken } = require("../controllers/jwt");

const router = express.Router();

router.get("/", async (req, res) => {
  // try {
  //   const newUser = await findUser("aweston2@gmail.com");
  //   res.json({ success: true, user: newUser.username });
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(400).json({ success: false, error: error.message });
  // }
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    // Handle system errors
    if (err) {
      console.error(`Login error: ${err.message}`);
      return res.status(500).send(`Login error: ${err.message}`);
    }

    // Handle authentication failure (wrong credentials)
    if (!user) return res.status(401).send(info.message);

    const token = generateToken(user);

    res.json({
      successMessage: `Login successful for ${user.username}!`,
      success: true,
      token,
      user: user.username,
    });
  })(req, res);
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await user.createUser(username, email, password);
    res.json({ success: true, user: newUser.username });
  } catch (error) {
    console.error("Registration:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// router.post('/logout', (req, res) => {
// });

module.exports = router;
