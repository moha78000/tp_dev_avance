const express = require("express");
const router = express.Router();

router.get('/auth', (req, res) => {
    res.render('login', {pageTitle: "Connexion"});
});

router.post('/auth', (req, res) => {
    // Vérifier identifiants
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'admin' && password === 'admin') {
        req.session.isLog = true;
        req.session.username = username;
        res.redirect('/admin/ajout');

    } else {
        res.redirect('/auth');
    }
});

module.exports = router;