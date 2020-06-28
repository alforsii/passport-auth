const passport = require('passport');
const User = require('../models/User.model');
const FacebookStrategy = require('passport-facebook').Strategy;

// serializer
require('./serializer');

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log('profile', profile);

      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return cb(null, user);
        } else {
          const name = profile.displayName.split(' ');
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: name[0],
            lastName: name[1],
            // image: profile.photos[0].value,/
          });
          return cb(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
