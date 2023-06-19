const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth');
const passwordValidator = require('../middlewares/passwordValidator');

router.post('/register', passwordValidator, userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/home', auth, userCtrl.home);

module.exports = router;