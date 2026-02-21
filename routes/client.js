const express = require("express");
const router = express.Router();
const {isAuth} = require("../middleware/auth-midd");
//const adminData = require("./admin");
const justePrix = require("../controllers/justePrix");
const navControler = require('../controllers/navControler');
const logout = require('../controllers/logout');
//const {produits} = require("./admin");

router.get("/", navControler.getAccueil);

module.exports = router;