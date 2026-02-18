const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.isLog) return res.redirect('/login');

    res.render('justePrix', {
        pageTitle: 'Le Juste Prix'
    });
});


module.exports = router;
