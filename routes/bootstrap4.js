var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('bootstrap4/index', { pageTitle: 'Templates - Bootstrap 4.0' });
});

router.get('/contact', function(req, res, next) {
  res.render('bootstrap4/contact', { pageTitle: 'Contact - Bootstrap 4.0' });
});
router.get('/blog-post', function(req, res, next) {
  res.render('bootstrap4/blog-post', { pageTitle: 'Blog Post - Bootstrap 4.0' });
});
router.get('/create-form', function(req, res, next) {
  res.render('bootstrap4/create-form', { pageTitle: 'Create Form - Bootstrap 4.0' });
});
router.get('/form_input_file', function(req, res, next) {
  res.render('bootstrap4/form_input_file', { pageTitle: 'Form Input File - Bootstrap 4.0' });
});
router.get('/modal', function(req, res, next) {
  res.render('bootstrap4/modal', { pageTitle: 'Modal - Bootstrap 4.0' });
});
router.get('/jumbotron', function(req, res, next) {
  res.render('bootstrap4/jumbotron', { pageTitle: 'Jumbotron - Bootstrap 4.0' });
});
router.get('/test', function(req, res, next) {
  res.render('bootstrap4/test', { title: 'Test - Bootstrap 4.0' });
});
module.exports = router;
