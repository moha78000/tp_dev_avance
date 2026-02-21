exports.getLogout = (req, res, next) => {
    console.log("middleware de déconnexion" , req.method);
    console.log(req.session.isLog);
    console.log(req.body);
    console.log(req.user);
    if (req.session.isLog) {
            req.session.destroy();
            res.redirect("/");
        }
    
   
    
   
}

