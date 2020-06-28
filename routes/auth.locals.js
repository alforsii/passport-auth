const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const { ensureAuthorized, ensureGest } = require('../configs/routeGuard');

// @desc  Signup page for main page
// @route GET /
router.get('/', ensureGest, (req, res) => {
  res.render('signup');
});

// @desc  Dashboard page
// @route GET /dashboard
router.get('/dashboard', ensureAuthorized, (req, res) => {
  console.log('req.user', req.user);
  res.render('dashboard', {
    name: req.user.firstName,
    image: req.user.image,
    email: req.user.email,
  });
});

// @desc  Login page
// @route GET /
router.get('/login', ensureGest, (req, res) => {
  res.render('login');
});

//=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==
//login using passport
//=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==
router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
);

// @desc  Signup page
// @route GET /
router.get('/signup', ensureGest, (req, res) => {
  res.render('signup');
});

//=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==
//signup using passport
//=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==
router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
  })
);

// @desc  Signup user
// @route POST /signup
// router.post('/signup', async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;
//     if (!firstName || !lastName || !email || !password) {
//       console.log('req.body', req.body);
//       res.status(401).render('signup', {
//         message:
//           'All fields are mandatory. Please provide your email and password.',
//       });
//       return;
//     }
//     const foundUserEmail = await User.findOne({ email });

//     if (!foundUserEmail) {
//       const salt = 10;
//       const hashedPassword = await bcryptjs.hash(password, salt);
//       const user = await User.create({
//         firstName,
//         lastName,
//         email,
//         password: hashedPassword,
//       });
//       console.log('User created', user);
//       res.redirect('/dashboard');
//     } else {
//       res.status(403).render('signup', {
//         message: 'User with this email already registered',
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).render('signup', {
//       message: 'Something went wrong in the server. Please try again later!',
//     });
//   }
// });

// @desc  Logout user
// @route GET /auth/logout
router.get('/logout', ensureAuthorized, (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
