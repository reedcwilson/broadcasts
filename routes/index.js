var mongoose = require('mongoose');
var link = mongoose.model('link');
var express = require('express');
var router = express.Router();

// index
router.get('/', function(req, res) {
  link.find(function(err, links, count){
    res.render('index', {
      title : 'Links',
      links : links
    });
  });
});

module.exports = router;
