// Middleware isAuth
const isAuth = (req, res, next) => {
    if (!req.session.isLog) {
        return res.redirect('/');
    }
    req.session.isLog = true;
    next();
};

const isAdmin = (req, res, next) => {
    if (req.session.role !== 1){
        return res.redirect('/');
    }
    next();
}    

module.exports = {isAuth, isAdmin};