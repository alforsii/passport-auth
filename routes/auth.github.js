const express = require('express');
const router = express.Router();
const passport = require('passport');

// @desc  Auth with github
// @route GET /auth/github
router.get('/github', passport.authenticate('github'));

// @desc  GitHub auth callback
// @route GET /auth/github/callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  }
);

module.exports = router;
