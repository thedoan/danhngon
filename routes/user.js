var express = require('express');
var router = express.Router();
var userControl = require('../controllers/user');
/* GET users listing. */
router.get('/', userControl.index);
//router.get('/new', userControl.create);
//router.post('/new', userControl.doCreate);
router.get('/edit', userControl.edit);
router.get('/delete', userControl.confirmDelete);
router.post('/delete', userControl.doDelete);
router.get('/login', userControl.login);
router.post('/login', userControl.doLogin);
router.get('/logout', userControl.doLogout);
router.get('/profile', userControl.profile);
module.exports = router;
