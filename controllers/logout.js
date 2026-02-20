const express = require("express");
const router = express.Router(); 
const isAuth = require("../middleware/auth-midd");

exports.getLogout = (req, res, next) => {
    console.log("middleware de déconnexion" , req.method);
    console.log(req.session.isLog);
    console.log(req.body);
    console.log(req.user);
    if (req.session.isLog) {
            req.session.destroy();
            res.redirect("/");
        }
    
   
    
   
}
 exports.routes = router;
