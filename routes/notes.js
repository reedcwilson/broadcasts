var mongoose = require('mongoose');
var note = mongoose.model('note');
var express = require('express');
var router = express.Router();
var everyauth = require('everyauth');

// get notes
router.get('/', function(req, res) {
  note.find(function(err, notes, count){
    res.json({ notes: notes});
  });
});

// get notes for user and broadcast
router.get('/:id', function(req, res) {
  note.find({user_id: req.user.id, broadcast_id: req.params.id}, function(err, note){
    if (err || note.length < 1) {
      res.json({ "error": err });
    } else {
      res.json(note[0]);
    }
  });
});

// create a new note
router.post('/create', function(req, res) {
  new note({
    content: req.body.content, 
    user_id: req.user.id,
    last_update: Date.now(), 
    broadcast_id: req.body.broadcast_id
  }).save(function(err, l, count){
    res.json({ success: "True", id: l._id });
  });
});

// delete note
router.post('/delete/:id', function(req, res) {
  note.findById(req.params.id, function (err, n){
    n.remove(function(err, n){
      res.json({ success: "True" });
    });
  });
});

// update note
router.post('/update/:id', function(req, res) {
  note.findById(req.params.id, function(err, n){
    n.content =  req.body.content; 
    n.last_update = Date.now();
    n.broadcast_id = req.body.broadcast_id;
    n.save(function(err, n, count){
      res.json({ success: "True" });
    });
  });
});

module.exports = router;
