const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

require('./githubStrategy');
require('./googleStrategy');
require('./facebookStrategy');
require('./localStrategy');

module.exports = (app) => {
  // session
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );

  // passport initializations
  app.use(passport.initialize());
  app.use(passport.session());
};
