var mongoose = require('mongoose');
// get models here
var broadcast = mongoose.model('broadcast');
var express = require('express');
var router = express.Router();

// index
router.get('/', function(req, res) {
    res.render('index');
});

// dashboard
router.get('/dashboard', function(req, res) {
  res.render('dashboard', {
    title : 'Dashboard'
  });
});

// broadcast
router.get('/broadcast/:id', function(req, res) {
  broadcast.findById(req.params.id, function(err, b){
    res.render('broadcast', {
      title : 'Broadcast',
      broadcast: b
    });
  });
});

module.exports = router;
