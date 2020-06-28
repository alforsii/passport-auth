const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

// serializer
require('./serializer');

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, next) => {
      let user;
      User.findOne({ email })
        .then((doc) => {
          user = doc;
          // if we get null
          if (!user) return next(null, false, { message: 'Incorrect email' });

          // if we get user object
          return bcrypt.compare(password, user.password);
        })
        .then((isPasswordCorrect) => {
          isPasswordCorrect
            ? next(null, user)
            : next(null, false, { message: 'Incorrect password' });
        })
        .catch((error) => next(error));
    }
  )
);

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    },
    (req, email, password, next) => {
      const { firstName, lastName } = req.body;

      User.findOne({ email })
        .then((foundUser) => {
          if (foundUser) {
            next(null, false, { message: 'This email already registered' });
            return;
          }
          bcrypt
            .hash(password, 10)
            .then((hash) => {
              return User.create({
                firstName,
                lastName,
                email,
                password: hash,
              });
            })
            .then((user) => next(null, user))
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    }
  )
);
