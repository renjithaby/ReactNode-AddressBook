var express = require('express');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('127.0.0.1:27017/nodetest1'); //local
//var db = monk('mongodb://heroku_k13z4wnw:2n3lm2c6s9nbstgfd5q6eippfi@ds155674.mlab.com:55674/heroku_k13z4wnw');

var jwt    = require('jsonwebtoken');

var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', "godslove");


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



//app.use("/static",express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/uploads',express.static(path.join(__dirname, './public/uploads')));

const staticFiles = express.static(path.join(__dirname, './reactclient/build'));
app.use(staticFiles);

app.use('/home',express.static(path.join(__dirname, './reactclient/build')));
app.use('/signin',express.static(path.join(__dirname, './reactclient/build')));
app.use('/signup',express.static(path.join(__dirname, './reactclient/build')));
app.use('/addcontact',express.static(path.join(__dirname, './reactclient/build')));
app.use('/editcontact',express.static(path.join(__dirname, './reactclient/build')));
app.use('/contact',express.static(path.join(__dirname, './reactclient/build')));


app.use('/', index);

// route middleware to verify a token
app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ result:'failed', message: 'EXPIRED_TOKEN' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        result:'failed',
        message: 'NO_TOKEN'
    });

  }
});

app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
