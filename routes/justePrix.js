const express = require('express');
const  User = require('../model/User');
const Historique = require('../model/Historique');

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.isLog) return res.redirect('/login');

    res.render('justePrix', {
        pageTitle: 'Le Juste Prix'
    });
});


// Créer ou récupérer un utilisateur
router.post('/user', async (req, res) => {
    const { username } = req.body;
    let user = await User.findOne({ username });
    if (!user) user = await User.create({ username });
    res.json(user);
});

// Ajouter une tentative
router.post('/tentative', async (req, res) => {
    const tentative = await Historique.create(req.body);
    res.json(tentative);
});

// Récupérer l'historique d'un utilisateur
router.get('/historique/:userId', async (req, res) => {
    const hist = await Historique.find({ userId: req.params.userId });
    res.json(hist);
});

module.exports = router;
