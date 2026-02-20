const express = require('express');
const justePrix = require('../controllers/justePrix');
const isAuth = require('../middleware/auth-midd');
const router = express.Router();

router.get('/justePrix', isAuth, justePrix.getJustePrix);


module.exports = router;
