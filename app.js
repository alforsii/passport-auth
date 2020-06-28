const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exp_hbs = require('express-handlebars');
const path = require('path');

// app - express initialization
const app = express();

// .env configs
dotenv.config({ path: './configs/config.env' });

// mongodb connection
require('./configs/db.config');

// passports and sessions
require('./configs/passport')(app);

// Morgan for dev logs in terminal
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set public static folder
app.use(express.static(path.join(__dirname, 'public')));
// set body parser
app.use(express.urlencoded({ extended: false }));

// set view engine and default layout to main.hbs
app.set('view engine', '.hbs');
app.engine('.hbs', exp_hbs({ defaultLayout: 'main', extname: '.hbs' }));

// routes
app.use('/', require('./routes/auth.locals'));
app.use('/auth', require('./routes/auth.google'));
app.use('/auth', require('./routes/auth.github'));
app.use('/auth', require('./routes/auth.facebook'));

// insure authorized
app.use('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
