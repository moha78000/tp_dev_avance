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
                error: 'Nom d’utilisateur déjà pris'
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
            error: 'Erreur lors de l’inscription'
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
        if (!user) return res.send('Utilisateur non trouvé');

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
exports.getAdmin = (req, res) => {
    if (req.session.role !== "1") {
        return res.redirect('/login');
    }

    res.render('admin', { pageTitle: 'Admin' });
};

exports.getEntries= (req,res) => {
    if (req.session.role !== 1) {
        return res.redirect('/login');
    }
    User.fetchAll()        .then(users => {
            res.render('admin', {
                pageTitle: 'Admin',
                users: users
            });
        })
        .catch(err => console.log(err));
};   