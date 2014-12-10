var everyauth = require('everyauth');
var session = require('express-session');
var mongoose = require('mongoose');
var user_db = mongoose.model('user');

module.exports = function(app) {

  var usersById = {};
  var nextUserId = 0;
  var usersByGoogleId = 0
    var google = {
      clientId: "892306764648-8jsch7nhrqg9b84giss29oaqiq9a4p6j.apps.googleusercontent.com",
      clientSecret: "OYKcB-k0jQLvYY69ozAKtnJe"
    };

  function findOrCreateUser(type, user, promise) {
    user_db.find({auth_type: type, type_id: user.id}, function(err, u) {
      if (u && u.length > 0) {
        u[0].id = u[0]._id;
        promise.fulfill(u[0]);
      } else {
        new_user = new user_db({
          auth_type: type,
          type_id: user.id,
          name: user.name
        });
        new_user.save(function(err, l, count) {
          if (err) {
            promise.fulfill(err);
          } else {
            new_user.id = new_user._id;
            promise.fulfill(new_user);
          }
        });
      }
    });
    return promise;
  }

  everyauth.everymodule
    .findUserById(function(id, callback) {
      user_db.findById(id, function(err, u){
        if (err) {
          callback(err, null);
        } else {
          callback(null, u);
        }
      });
    });

  everyauth.debug = true;
  // google
  everyauth.google
    .appId(google.clientId)
    .appSecret(google.clientSecret)
    .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/')
    .findOrCreateUser(function(session, accessToken, extra, googleUser) {
      //googleUser.refreshToken = extra.refresh_token;
      //googleUser.expiresIn = extra.expires_in;
      var promise = this.Promise();
      return findOrCreateUser('google', googleUser, promise);
    })
  .redirectPath('/');

  // session needs to come before everyauth.middleware
  app.use(session({secret: "SECRETIVE",
    saveUninitialized: true,
    resave: true}));
  app.use(everyauth.middleware());

  // facebook
  //everyauth
  //.facebook
  //.appId(fb.appId)
  //.appSecret(conf.fb.appSecret)
    //.findOrCreateUser(function (session, accessToken, accessTokenExtra, fbUserMetadata) {
      //return usersByFbId[fbUserMetadata.id] ||
      //(usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
    //})
  //.redirectPath('/');

  // twitter
  //everyauth
    //.twitter
    //.consumerKey(conf.twit.consumerKey)
    //.consumerSecret(conf.twit.consumerSecret)
    //.findOrCreateUser(function (sess, accessToken, accessSecret, twitUser) {
      //return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
    //})
  //.redirectPath('/');

};
