var mongoose = require( 'mongoose' );

module.exports = function(env) {

  var Schema   = mongoose.Schema;

  var link = new Schema({
    user_id       : String,
    broadcast_id  : String,
    description   : String,
    uri           : String,
    time          : String
  });

  var note = new Schema({
    user_id       : String,
    broadcast_id  : String,
    content       : String,
    last_update   : Date
  });

  var broadcast = new Schema({
    user_id       : String,
    name          : String,
    uri           : String,
    last_update   : Date
  });

  var user = new Schema({
    auth_type     : String,
    type_id       : String,
    name          : String
  });

  mongoose.model('link', link);
  mongoose.model('note', note);
  mongoose.model('broadcast', broadcast);
  mongoose.model('user', user);
  if (env == 'development') {
    mongoose.connect('mongodb://localhost/broadcasts' );
  }
  else {
    mongoose.connect('mongodb://heroku_app32922839:2be4ib6j2tc5s7n9otlhvncjf9@ds029831.mongolab.com:29831/heroku_app32922839' );
  }
};
