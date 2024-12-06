const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');

const app = express();
const indexRouter = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

require('./app_api/models/db');

const isProduction = process.env.NODE_ENV === 'production';

// SSL configurations
let credentials = null;
if (isProduction) {
  const privateKey = fs.readFileSync('./sslcert/key.pem', 'utf8');
  const certificate = fs.readFileSync('./sslcert/cert.pem', 'utf8');
  credentials = { key: privateKey, cert: certificate };
}

// Middleware configurations
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:8000'],  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public/')));

// Redirect root to login
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/', indexRouter); 
app.use('/api', apiRoutes); 

app.use((req, res, next) => next(createError(404)));

// Error handler middleware
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).render('error.pug', { error: err });
});

const httpServer = http.createServer(app);
httpServer.listen(8000, () => console.log('HTTP server running on port 8000'));

if (isProduction) {
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(443, () => console.log('HTTPS server running on port 443'));
  httpsServer.on('error', (err) => console.error('HTTPS Server Error:', err));
}

httpServer.on('error', (err) => console.error('HTTP Server Error:', err));

module.exports = app;
