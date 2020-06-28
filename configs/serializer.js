const passport = require('passport');
const User = require('../models/User.model');

passport.serializeUser((user, callback) => callback(null, user._id));

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then((user) => callback(null, user))
    .catch((error) => callback(error));
});

// passport.serializeUser(function (user, done) {
//   done(null, user._id);
// });
// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
