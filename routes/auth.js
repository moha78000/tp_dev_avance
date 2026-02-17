const express = require("express");
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt'); // pour hacher les mots de passe

router.get('/signup', (req, res) => {
    res.render('signup', { pageTitle: 'Inscription' });
});
// PAGE INSCRIPTION
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        // 1️Vérifier si le nom d'utilisateur existe
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            // utilisateur déjà existant
            return res.render('signup', {
                pageTitle: 'Inscription',
                error: 'Nom d’utilisateur déjà pris'
            });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();

        // Redirection vers login
        res.redirect('/login');

    } catch (err) {
        console.error(err);
        res.render('signup', {
            pageTitle: 'Inscription',
            error: 'Erreur lors de l’inscription'
        });
    }
});

// PAGE CONNEXION
router.get('/login', (req, res) => {
    res.render('login', { pageTitle: 'Connexion' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.send('Utilisateur non trouvé');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.send('Mot de passe incorrect');

        // Créer session
        req.session.isLog = true;
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.role = user.role;

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send('Erreur lors de la connexion');
    }
});

// LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});
module.exports = router;