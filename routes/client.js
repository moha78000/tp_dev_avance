const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth-midd");
const adminData = require("./admin");
const justePrix = require("../controllers/justePrix");
const navControler = require('../controllers/navControler');
const logout = require('../controllers/logout');
const {produits} = require("./admin");

router.get('/justePrix', isAuth, justePrix.getJustePrix);
router.get("/", navControler.getAccueil);
router.get('/out', isAuth, logout.getLogout);;

module.exports = router;