const express = require("express");
const router = express.Router();

const adminData = require("./admin");

const navControler = require('../controllers/navControler');
const {produits} = require("./admin");

router.get('/',navControler.getBoutique);

module.exports = router;