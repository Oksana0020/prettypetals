const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const indexRouter = require('./app_server/routes/index'); 
require('./app_api/models/db'); 

const apiRoutes = require('./app_api/routes/index');

const app = express();

// Middleware configuration
app.use(cors({
  origin: 'http://localhost:4200',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Middleware for logging, parsing and serving static files
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public')));

// Redirect root URL to login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Use the index routes for '/' path
app.use('/', indexRouter);
app.use('/api', apiRoutes);

// Catch 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;