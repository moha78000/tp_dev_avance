const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth-midd");
const adminData = require("./admin");
const justePrix = require("../controllers/justePrix");
const navControler = require('../controllers/navControler');
const {produits} = require("./admin");

router.get('/justePrix', isAuth, justePrix.getJustePrix);


module.exports = router;