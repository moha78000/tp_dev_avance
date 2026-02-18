const adminData = require("../routes/admin");
const User = require('../model/user');

exports.postInscription = (req,res,next) => {
    console.log('middleware inscription', req.method);
    const user = new User(req.body.user, req.body.password);
    user.save();
    res.redirect('/');
    }


