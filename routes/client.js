const express = require("express");
const router = express.Router();
const path = require("path");
const rootApps = require("../outils/path");
const adminData = require("./admin");

const {produits} = require("./admin");

router.get('/',(req,res,next) => {
    console.log('middleware racine', req.method);
    console.log(adminData.produits);
    res.render('boutique',{pageTitle:"Boutique",listeProduits: produits});
})

module.exports = router;