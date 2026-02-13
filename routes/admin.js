const express = require("express");
const router = express.Router();

const navControler = require('../controllers/navControler');
const isAuth = require("../middleware/auth-midd");

router.get('/ajout',navControler.getAjoutProduits);

router.post('/ajout',navControler.postAjoutProduit);

module.exports = router;