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
      const user = await findUser(email);
      
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) 
        return done(null, false, { message: 'Invalid password' });
      else
        return done(null, user);
    } catch (error) {
      return done(null, false, { message: 'LocalStrategy failed' });
    }
  }
));

module.exports = passport;