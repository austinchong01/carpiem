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
passport.use(new LocalStrategy({
    usernameField: 'email'  // Tell Passport to use 'email' field instead of 'username'
  },
  async (email, password, done) => {
    
    try {
      const user = await findUser(email);
      
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Invalid password' });
      }
      
      // Authentication successful - return the user (without password)
      const { password: _, ...userWithoutPassword } = user;
      return done(null, userWithoutPassword);
      
    } catch (error) {
      return done(error);
    }
  }
));

module.exports = passport;