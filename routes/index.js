var mongoose = require('mongoose');
// get models here
var express = require('express');
var router = express.Router();

// index
router.get('/', function(req, res) {
    res.render('index');
});

// sign in
router.get('/auth', function(req, res) {
    res.render('login');
});

// dashboard
router.get('/dashboard', function(req, res) {
  res.render('dashboard', {
    title : 'Dashboard'
  });
});

// broadcast
router.get('/broadcast', function(req, res) {
  res.render('broadcast', {
    title : 'Broadcast'
  });
});

module.exports = router;
