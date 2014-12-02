var mongoose = require('mongoose');
var link = mongoose.model('link');
var express = require('express');
var router = express.Router();

// get links
router.get('/', function(req, res) {
  link.find(function(err, links, count){
    res.json({ links: links });
  });
});

// create a new link
router.post('/create', function(req, res) {
  new link({
    uri: req.body.uri, time : req.body.time
  }).save(function(err, l, count){
    res.json({ success: "True" });
  });
});

// delete link
router.post('/delete/:id', function(req, res) {
  link.findById(req.params.id, function (err, l){
    l.remove(function(err, l){
      res.json({ success: "True" });
    });
  });
});

// update link
router.post('/edit/:id', function(req, res) {
  console.log(req.params.id);
  link.findById(req.params.id, function(err, l){
    l.uri =  req.body.uri; 
    l.time = req.body.time;
    l.save(function(err, l, count){
      res.json({ success: "True" });
    });
  });
});

module.exports = router;
