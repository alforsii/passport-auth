const passport = require('passport');
const User = require('../models/User.model');
const GitHubStrategy = require('passport-github').Strategy;

// serializer
require('./serializer');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      //   console.log('profile', profile);

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
