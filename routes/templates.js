var express = require('express');
var router = express.Router();
var oLocalViews = {
	title: 'Templates - Bootstrap 4.0',
	user: {}
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('templates/index', {title: 'Templates - Bootstrap 4.0'});
});

router.get('/grid', function(req, res, next) {
  res.render('templates/grid', {title: 'Grid - Templates - Bootstrap 4.0'});
});
router.get('/media_object', function(req, res, next) {
  res.render('templates/media_object', { title: 'Media Object - Bootstrap 4.0' });
});
router.get('/flexbox', function(req, res, next) {
  res.render('templates/flexbox', { title: 'Flexbox - Bootstrap 4.0' });
});
router.get('/badges', function(req, res, next) {
  res.render('templates/badges', { title: 'Badges - Bootstrap 4.0' });
});
router.get('/card', function(req, res, next) {
  res.render('templates/card', { title: 'Badges - Bootstrap 4.0' });
});
router.get('/test', function(req, res, next) {
  res.render('templates/test', { title: 'Test - Bootstrap 4.0' });
});
router.get('/404', function(req, res, next) {
	res.render('templates/404', {title: '404 Page !'});
});
module.exports = router;
