const User = require('../model/User');
const bcrypt = require('bcrypt');

// PAGE SIGNUP (GET)
exports.getSignup = (req, res) => {
    if (req.session.isLog) {
        return res.redirect('/');
    }

    res.render('signup', { pageTitle: 'Inscription' });
};

// POST SIGNUP
exports.postSignup = async (req, res) => {
    if (req.session.isLog) {
        return res.redirect('/');
    }

    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.render('signup', {
                pageTitle: 'Inscription',
                error: 'Nom d\'utilisateur deja pris'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();

        res.redirect('/login');

    } catch (err) {
        console.error(err);
        res.render('signup', {
            pageTitle: 'Inscription',
            error: 'Erreur lors de l\'inscription'
        });
    }
};

// PAGE LOGIN (GET)
exports.getLogin = (req, res) => {
    if (req.session.isLog) {
        return res.redirect('/');
    }
    res.render('login', { pageTitle: 'Connexion' });
};

// POST LOGIN
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.send('Utilisateur non trouve');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.send('Mot de passe incorrect');

        req.session.isLog = true;
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.role = user.role;

        return res.redirect('/');

    } catch (err) {
        console.error(err);
        res.send('Erreur lors de la connexion');
    }
};

// PAGE ADMIN

exports.getEntries = async (req, res) => {
    if (req.session.role !== 1) {
        return res.redirect('/login');
    }

    try {
        const users = await User.find();

        res.render('historiqueconnexion', {
            pageTitle: 'Historique des connexions',
            users
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors du chargement de l'historique");
    }
};

exports.postDeleteEntry = async (req, res) => {
    if (req.session.role !== 1) {
        return res.redirect('/login');
    }

    try {
        const userId = req.params.userId;

        if (req.session.userId === userId) {
            return res.redirect('/admin/historiqueconnexion');
        }

        await User.findByIdAndDelete(userId);
        return res.redirect('/admin/historiqueconnexion');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur lors de la suppression');
    }
};

exports.getSignupAdmin = (req, res) => {
    res.render('signupadmin', { pageTitle: 'Inscription' });
};

exports.postSignupAdmin = async (req, res) => {
    if (req.session.role !== 1) {
        return res.redirect('/login');
    }
    const { username, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.render('signupadmin', {
                pageTitle: 'Inscription',
                error: 'Nom d\'utilisateur deja pris'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword,
            role
        });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.render('signupadmin', {
            pageTitle: 'Inscription',
            error: 'Erreur lors de l\'inscription'
        });
    }
};
