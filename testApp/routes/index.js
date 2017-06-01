var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/test', function(req, res, next) {
	console.log(path.normalize(__dirname + '/../views/index.html'));
  res.sendFile(path.normalize(__dirname + '/../views/index.html'));
});

module.exports = router;
