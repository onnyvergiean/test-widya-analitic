const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/api/v1/products');
const { authenticateToken } = require('../utils/jwt');

router.get('/v1/products', controller.getAllProducts);
router.get('/v1/products/me', authenticateToken, controller.getMyProducts);
router.get('/v1/products/:id', controller.getProductById);
router.post('/v1/products', authenticateToken, controller.createProduct);
router.put('/v1/products/:id', authenticateToken, controller.updateProduct);
router.delete('/v1/products/:id', authenticateToken, controller.deleteProduct);

module.exports = router;
