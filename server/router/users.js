const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/api/v1/users');
const { authenticateToken } = require('../utils/jwt');

router.get('/v1/users', controller.getUsers);
router.get('/v1/users/me', authenticateToken, controller.getUserProfile);

module.exports = router;
