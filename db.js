var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var link = new Schema({
    user_id       : String,
    broadcast_id  : String,
    uri           : String,
    time          : Date
});

var note = new Schema({
    user_id       : String,
    broadcast_id  : String,
    content       : String,
    last_update   : Date
});

var broadcast = new Schema({
    broadcast_id  : String,
    user_id       : String,
    uri           : String,
    last_update   : Date
});
 
mongoose.model('link', link);
mongoose.model('note', note);
mongoose.model('broadcast', broadcast);
//mongoose.connect('mongodb://localhost/broadcasts');
mongoose.connect('mongodb://nodejitsu:ad15d053df09b2a67eafb99ab581c1e6@troup.mongohq.com:10033/nodejitsudb1045838899');
