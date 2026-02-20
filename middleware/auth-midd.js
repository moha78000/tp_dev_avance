const adminData = require("../routes/admin");
const express = require("express");
const router = express.Router();
// Middleware isAuth
const isAuth = (req, res, next) => {
    if (!req.session.isLog) {
        return res.redirect('/');
    }
    req.session.isLog = true;
    next();
};

module.exports = isAuth;