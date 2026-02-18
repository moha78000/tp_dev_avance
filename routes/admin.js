const express = require("express");
const router = express.Router();

const navControler = require("../controllers/navControler");
const isAuth = require("../middleware/auth-midd");


router.get('/signup', navControler.postInscription);

module.exports = router;