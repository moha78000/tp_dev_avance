const express = require("express");
const router = express.Router();

const navControler = require('../controllers/navControler');
const isAuth = require("../auth/isAuth");

router.get('/ajout',isAuth,navControler.getAjoutProduits);

router.post('/ajout',navControler.postAjoutProduit);

module.exports = router;