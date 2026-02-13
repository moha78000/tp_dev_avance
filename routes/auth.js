if (!req.session.isLog) {
    console.log("Non authentifié");
    return res.redirect('/auth');
} else {
    res.render('ajout',{pageTitle:"Ajout admin", isLog:req.session.isLog});
}