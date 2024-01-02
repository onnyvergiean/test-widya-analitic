const express = require('express');
const router = express.Router();

const users = require('./users');
const auth = require('./auth');
const products = require('./products');

router.use(users);
router.use(auth);
router.use(products);

module.exports = router;
