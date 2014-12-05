var everyauth = require('everyauth');

module.exports = function(app) {


  var usersById = {};
  var nextUserId = 0;

  // facebook vars
  //var usersByFBId = 0
  //var fb = {
    //appId: "",
    //appSecret: ""
  //};

  // twitter vars
  //var usersByTwitId = 0
  //var twit = {
    //consumerKey: "",
    //consumerSecret: ""
  //};

  // google vars
  // projectid: radiant-psyche-785
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

  // google
  everyauth.google
    .appId(google.clientId)
    .appSecret(google.clientSecret)
    .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/')
    .findOrCreateUser(function (sess, accessToken, extra, googleUser) {
      googleUser.refreshToken = extra.refresh_token;
      googleUser.expiresIn = extra.expires_in;
      return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
    })
  .redirectPath('/');
};
