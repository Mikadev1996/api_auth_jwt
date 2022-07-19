var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', (req, res) => {
  res.json({
    message: 'API Start',
  })
})

router.post('/api/posts', (req, res) => {
  res.json({
    message: 'Post Created...'
  })
})

router.post('/api/login', (res, res) => {
  // Mock user
  jwt.sign();
})

module.exports = router;
