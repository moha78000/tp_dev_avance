const express = require("express");
const router = express.Router();
const path = require("path");
const rootApps = require("../outils/path");
const produits=[]

router.get('/ajout',(req,res,next) => {
    console.log('middleware ajout', req.method);
    res.render('ajout',{pageTitle:"Ajout admin"});
})

router.post('/ajout',(req,res,next) => {
    console.log('middleware produit', req.method);
    produits.push({produit: req.body.produit});
    console.log(req.body);
    res.redirect('/');
})

exports.routes = router;
exports.produits = produits;