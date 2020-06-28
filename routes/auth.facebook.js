const express = require('express');
const router = express.Router();
const passport = require('passport');

// @desc  Auth with facebook
// @route GET /auth/facebook
router.get('/facebook', passport.authenticate('facebook'));

// @desc  Facebook auth callback
// @route GET /auth/facebook/callback
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  }
);

module.exports = router;
