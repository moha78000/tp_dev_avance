const adminData = require("../routes/admin");
const Produit = require('../model/dataProduits');

exports.getAjoutProduits = (req,res,next) => {
    console.log('log session',req.session.isLog);
    console.log('middleware ajout', req.method);
    if (!req.session.isLog) {
        console.log("Non authentifié");
        return res.redirect('/auth');
    } else {
        res.render('ajout',{pageTitle:"Ajout admin"});
    }
}

exports.postAjoutProduit = (req,res,next) => {
    console.log('middleware produit', req.method);
    console.log('log session',req.session.isLog);
    console.log(req.body);
    const produit = new Produit(req.body.produit);
    produit.save();
    res.redirect('/');
}

exports.getBoutique = (req,res,next) => {
    console.log('middleware racine', req.method);
    console.log('log session',req.session.isLog);
    const produits = Produit.fetchAll();
    res.render('boutique',{pageTitle:"Boutique",listeProduits: produits});
}