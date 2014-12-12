var mongoose = require('mongoose');
var broadcast = mongoose.model('broadcast');
var note = mongoose.model('note');
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
  if (!req.user) {
    res.json({ "error": "must be authenticated to access" });
  } else {
    broadcast.findById(req.params.id, function(err, broadcast){
      res.cookie('user_id', req.user.id);
      res.json(broadcast);
    });
  }
});

// create a new broadcast
router.post('/create', function(req, res) {
  if (!req.user) {
    res.json({ "error": "must be authenticated to access" });
  } else {
    new broadcast({
      uri: req.body.uri, 
      name: req.body.name,
      user_id: req.user.id,
      last_update: Date.now()
    }).save(function(err, l, count){
      // create a note when a broadcast is created
      new note({
        content: '# ' + req.body.name + '\n',
          user_id: req.user.id,
          last_update: Date.now(), 
          broadcast_id: l._id
      }).save(function(err, n, count) {
        res.json({ success: "True", id: l._id });
      });
    });
  }
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
