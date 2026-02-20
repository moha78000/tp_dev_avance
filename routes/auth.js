const express = require("express");
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt'); // pour hacher les mots de passe
const justePrix = require('../controllers/justePrix');
const auth = require('../controllers/auth');
const isAuth = require("../middleware/auth-midd");
const logout = require('../controllers/logout');

router.get('/justePrix', isAuth, justePrix.getJustePrix);
router.get('/login', auth.postLogin);
router.get('/signup' , auth.getSignup);
router.get('/out', isAuth, logout.getLogout );
module.exports = router;
