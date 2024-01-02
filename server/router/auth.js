const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/api/v1/auth');

router.post('/v1/register', controller.registerUser);
router.post('/v1/login', controller.loginUser);

module.exports = router;
