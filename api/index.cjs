const express = require('express');
const router = express.Router();

router.use('/quotes', require('./quotes.cjs'));
router.use('/users-badges', require('./users-badges.cjs'));
router.use('/users', require ('./users.cjs'));

module.exports = router;