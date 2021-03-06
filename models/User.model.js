const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  googleId: { type: String },
  gitHubId: { type: String },
  facebookId: { type: String },
  displayName: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
