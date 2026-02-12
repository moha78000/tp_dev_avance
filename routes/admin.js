const express = require("express");
const router = express.Router();


let html="<!DOCTYPE html><html><head><title>page ajout</title></head>";
html+="<body><h1>Page d'ajout</h1>";
html+="<form action='produit' method='POST'>";
html+="<label for='produit'>Produit</label>";
html+="<input type='text' name='produit' placeholder='Produit'/>";
html+="<button type='submit' id='produit' value='produit'>Produit</button>";
html+="</form>";
html+="</body></html>";

router.get('/ajout',(req,res,next) => {
    console.log('middleware ajout', req.method);
    res.send(html);
})

router.post('/produit',(req,res,next) => {
    console.log('middleware produit', req.method);
    console.log(req.body);
    res.redirect('/ajout');
})

module.exports = router;