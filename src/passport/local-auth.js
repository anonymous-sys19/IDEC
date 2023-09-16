const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const user = await User.findOne({ 'username': username })
  //console.log(user)
  if (user) {
    return done(null, false, req.flash('signupMessage', 'The username is already Taken.'));
  } else {
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = newUser.encryptPassword(req.body.password);
    console.log(newUser)
    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    return done(null, false, req.flash('signinMessage', 'No User Found'));
  }
  if (!user.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
  }
  return done(null, user);
}));
