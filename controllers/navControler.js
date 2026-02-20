const adminData = require("../routes/admin");
const User = require('../model/user');
const auth = require("../routes/auth");

exports.getAccueil = (req, res) => {
    res.render('accueil', {
        pageTitle: 'Accueil'
    });
};
