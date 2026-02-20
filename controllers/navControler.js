const adminData = require("../routes/admin");
const User = require('../model/user');
const path = require('../outils/path')
const auth = require("../routes/auth");

exports.getAccueil = (req, res, next) => {
    res.render('accueil', {
        user: req.session.isLog ? { loggedIn: true } : { loggedIn: false },
        role: req.session.role || null
    });
};
