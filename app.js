const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const fs = require('fs');
const http = require('http');
const https = require('https');

const app = express();
const indexRouter = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

// Database connection and Passport setup
require('./app_api/models/db');
require('./passportConfig');

// SSL configurations
let credentials = null;
try {
  const privateKey = fs.readFileSync('./sslcert/key.pem', 'utf8');
  const certificate = fs.readFileSync('./sslcert/cert.pem', 'utf8');
  credentials = { key: privateKey, cert: certificate };
} catch (err) {
  console.warn('SSL certificates are missing. HTTPS will not be available.');
}

// Middleware configurations
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://prettypetals.onrender.com']
  : ['http://localhost:4200', 'http://localhost:8000'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Logger and parsers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public')));

// Session and Passport configurations
app.use(session({
  secret: '1b6dd142a9d3acad36d8398214a7937b85bf7b8cf1625235fead50be51c3dc41',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/api', apiRoutes);

// Serve Angular app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist/pretty-petals-public/browser')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/pretty-petals-public/browser/index.html'));
  });
}


app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).render('error.pug', { error: err });
});

// Create HTTP and HTTPS servers
const httpPort = process.env.PORT || 8000; 
const httpsPort = process.env.HTTPS_PORT || 443;

// Create HTTP and HTTPS servers

//const httpServer = http.createServer(app);
//httpServer.listen(httpPort, () => console.log(`HTTP server running on port ${httpPort}`));

//if (credentials) {
  //const httpsServer = https.createServer(credentials, app);
  //httpsServer.listen(httpsPort, () => console.log(`HTTPS server running on port ${httpsPort}`));
//}


module.exports = app;
