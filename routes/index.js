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

// create a new link
router.post('/newlink', function(req, res) {
  new link({
    uri: req.body.content, updated_at : Date.now()
  }).save(function(err, l, count){
    res.redirect('/');
  });
});

module.exports = router;
