const express = require("express");
const isAuth = require("../middleware/auth-midd");
const router = express.Router();
const logout = require('../controllers/logout');

router.get('/out', isAuth, logout.getLogout);

exports.routes = router;