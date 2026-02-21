//const adminData = require("../routes/admin");
const User = require('../model/User');
const path = require('../outils/path')
const auth = require("../routes/auth");

exports.getAccueil = (req, res, next) => {
    res.render('accueil', {
        pageTitle: 'Accueil',
        user: req.session.isLog ? { loggedIn: true } : { loggedIn: false },
        role: req.session.role ?? 0
    });
};
