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
    mongoose.connect('mongodb://nodejitsu:ad15d053df09b2a67eafb99ab581c1e6@troup.mongohq.com:10033/nodejitsudb1045838899' );
  }
};
