const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
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


// Local strategy
passport.use(new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => {
    try {
          // Simulate a system error
          if (email === "error@test.com") {
            throw new Error("Simulated system error");
          }
      const user = await findUser(email);
      
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) 
        return done(null, false, { message: 'Invalid password' });
      else
        return done(null, user);
    } catch (error) {
      if (error.message == `User with email '${email}' not found`)
        return done(null, false, { message: error.message })
      return done(error, false, {message: error.message});
    }
  }
));

module.exports = passport;