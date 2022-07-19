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

router.post('/api/posts', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403).json({error: err});
    } else {
      res.json({
        message: 'Post Created...',
        authData: authData,

      })
    }
  })
})

router.post('/api/login', (res, res, next) => {
  // Mock user
  const user = {
    id: 1,
    username: 'testName',
    email: 'test@gmail.com'
  }
  jwt.sign({user: user}, 'secretkey', {expiresIn: '3600s'} ,(err, token) => {
    if (err) return next(err);
    res.json({
      token: token,
    })
  });
})

// Token Format
// Authorization: Bearer <access_token>

// Verify token

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at space
    const bearer = bearerHeader.split(' ');
    req.token = bearer[1];
    next();
  } else {
    res.send(403).json({error: 'Token undefined'})
  }

}

module.exports = router;
