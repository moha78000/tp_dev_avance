const express = require("express");
const router = express.Router();

const navControler = require("../controllers/navControler");
const auth = require("../controllers/auth");
const midd = require("../middleware/auth-midd");

//router.get('/admin', midd.isAdmin, auth.getEntries);
router.get('/signupadmin', midd.isAdmin, auth.getSignupAdmin);
router.post('/signupadmin', midd.isAdmin, auth.postSignupAdmin);
router.get('/historiqueconnexion', midd.isAdmin, auth.getEntries);
router.post('/historiqueconnexion/delete/:userId', midd.isAdmin, auth.postDeleteEntry);

module.exports = router;
