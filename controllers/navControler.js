exports.getAccueil = (req, res, next) => {
    res.render('accueil', {
        pageTitle: 'Accueil',
        user: req.session.isLog ? { loggedIn: true } : { loggedIn: false },
        role: req.session.role ?? 0
    });
};
