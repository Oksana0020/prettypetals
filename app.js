const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./app_server/routes/index'); 
// const usersRouter = require('./app_server/routes/users'); 
require('./app_api/models/db');

// Route imports
const apiRoutes = require('./app_api/routes/index');
//const flowersRoutes = require('./app_api/routes/flowers'); 
//const authRoutes = require('./app_api/routes/auth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// redirecting http://localhost:3000/ to login right away so it won't give error
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Use the index routes for '/' path
app.use('/', indexRouter);
app.use('/api', apiRoutes);
//app.use('/api', flowersRoutes); 
//app.use('/api', authRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
