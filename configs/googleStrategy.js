const passport = require('passport');
const User = require('../models/User.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// serializer
require('./serializer');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log('profile', profile);

      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return cb(null, user);
        } else {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
          });
          return cb(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
