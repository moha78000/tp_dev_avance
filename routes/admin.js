const express = require("express");
const router = express.Router();

const justePrix = require("../controllers/justePrix");
const isAuth = require("../middleware/auth-midd");


//router.get('/justePrix', isAuth, justePrix.getJustePrix);

module.exports = router;