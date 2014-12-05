
var express = require('express');
var app = express();

// mongoose setup
require('./db')(app.get('env'));

// everyauth setup
//require('./auth');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var everyauth = require('everyauth');

var routes = require('./routes/index');
var links = require('./routes/links');
var notes = require('./routes/notes');
var broadcasts = require('./routes/broadcasts');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// ============================================================================
// oauth
// ============================================================================
var usersById = {};
var nextUserId = 0;
var usersByGoogleId = 0
var google = {
  clientId: "892306764648-8jsch7nhrqg9b84giss29oaqiq9a4p6j.apps.googleusercontent.com",
  clientSecret: "OYKcB-k0jQLvYY69ozAKtnJe"
};

function addUser(source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
    console.log(user);
  }
  return user;
}
everyauth.debug = true;
// google
everyauth.google
  .appId(google.clientId)
  .appSecret(google.clientSecret)
  .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/')
  .findOrCreateUser(function (sess, accessToken, extra, googleUser) {
    googleUser.refreshToken = extra.refresh_token;
    googleUser.expiresIn = extra.expires_in;
    var temp = usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));

    console.log(temp);
    return temp;
  })
.redirectPath('/');

app.use(everyauth.middleware());
// ============================================================================

app.use('/', routes);
app.use('/links', links);
app.use('/notes', notes);
app.use('/broadcasts', broadcasts);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
