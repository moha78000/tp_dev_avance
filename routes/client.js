const express = require("express");
const router = express.Router();
const navControler = require('../controllers/navControler');

router.get("/", navControler.getAccueil);

module.exports = router;