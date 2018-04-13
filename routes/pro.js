var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pro/index', { pageTitle: 'Index - Pro html and css3' });
});
router.get('/example11', function(req, res, next) {
  res.render('pro/example11', { pageTitle: 'Background - Pro html and css3' });
});
module.exports = router;
