const isAuth = require("../middleware/auth-midd");

exports.getJustePrix = (req, res) => {
    console.log("middleware du juste Prix" , req.method);
    console.log(req.session.isLog);
    console.log(req.body);
    console.log(req.user);
    res.render('justePrix',{pageTitle:"Le Juste Prix", isLog:req.session.isLog});

}