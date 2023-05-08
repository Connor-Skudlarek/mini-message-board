var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {
  console.log(req.cookies.messages)
  res.render('index', { title: 'Express', messages: req.cookies.messages });
});

module.exports = router;
