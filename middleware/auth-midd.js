const adminData = require("../routes/admin");
const express = require("express");
const router = express.Router();
// Middleware isAuth
const isAuth = (req, res, next) => {
    if (!req.session.isLog) {
        return res.redirect('/auth');
    }
    req.session.isLog = true;
    next();
};

router.get('/ajout', isAuth, (req, res) => {

    return res.redirect('/ajout');


});

router.get('/modifier', isAuth, (req, res) => {
    return res.redirect('/modifier');

});


module.exports = isAuth;