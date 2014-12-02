var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var link = new Schema({
    user_id     : String,
    uri         : String,
    time        : Date
});
 
mongoose.model('link', link);
mongoose.connect('mongodb://localhost/link');
