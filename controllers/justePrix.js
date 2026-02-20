
exports.getJustePrix = (req, res, next) => {
    console.log("middleware du juste Prix" , req.method);
    console.log(req.session.isLog);
    console.log(req.body);
    console.log(req.user);
    if (!req.session.isLog) {
        console.log("Non authentifié");
        return res.redirect('/login');
    } else {
        res.render('justePrix',{pageTitle:"Le Juste Prix", isLog:req.session.isLog});
    }
    next();

}