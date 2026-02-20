const isAuth = require("../middleware/auth-midd");

exports.getLogout = (req, res, next) => {
    console.log("middleware de déconnexion" , req.method);
    console.log(req.session.isLog);
    console.log(req.body);
    console.log(req.user);
    if (isAuth(req.session.isLog)) {
        console.log("Non authentifié");
        return res.redirect('/login');
    } else {
        res.redirect('/out');
    }

}