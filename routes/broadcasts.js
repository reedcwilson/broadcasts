var mongoose = require('mongoose');
var broadcast = mongoose.model('broadcast');
var express = require('express');
var router = express.Router();

// get broadcasts
router.get('/', function(req, res) {
  broadcast.find(function(err, broadcasts, count){
    res.json({ broadcasts: broadcasts});
  });
});

// get by id
router.get('/:id', function(req, res) {
  broadcast.findById(req.params.id, function(err, broadcast){
    res.json(broadcast);
  });
});

// create a new broadcast
router.post('/create', function(req, res) {
  new broadcast({
    uri: req.body.uri, 
    name: req.body.name,
    user_id: req.user.id,
    last_update: Date.now()
  }).save(function(err, l, count){
    res.json({ success: "True", id: l._id });
  });
});

// delete broadcast
router.post('/delete/:id', function(req, res) {
  broadcast.findById(req.params.id, function (err, b){
    b.remove(function(err, n){
      res.json({ success: "True" });
    });
  });
});

// update broadcast
router.post('/update/:id', function(req, res) {
  broadcast.findById(req.params.id, function(err, b){
    b.uri =  req.body.uri; 
    b.name = req.body.name;
    b.user_id = req.body.user_id;
    b.last_update = Date.now();
    b.save(function(err, b, count){
      res.json({ success: "True" });
    });
  });
});

module.exports = router;
