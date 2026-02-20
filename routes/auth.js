const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); // pour hacher les mots de passe
const auth = require('../controllers/auth');
const isAuth = require("../middleware/auth-midd");
const logout = require('../controllers/logout');

router.get('/login', auth.getLogin);
router.post('/login', auth.postLogin);
router.get('/signup', auth.getSignup);
router.post('/signup', auth.postSignup);
module.exports = router;
