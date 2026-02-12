const express = require("express");
const router = express.Router();

let html="<!DOCTYPE html>";
html+="<html><head><title>Page boutique</title></head>";
html+="<body><h1>Boutique</h1>";
html+="</body></html>";

router.get('/',(req,res,next) => {
    console.log('middleware racine', req.method);
    res.send(html);
})
module.exports = router;