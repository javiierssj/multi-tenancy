// src/routes/taskRoutes.js

const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, productController.createProduct);
router.get('/', authMiddleware, productController.getAllProducts);
router.get('/:taskId', authMiddleware, productController.getProductById);
router.patch('/:taskId', authMiddleware, productController.updateProduct);
router.delete('/:taskId', authMiddleware, productController.deleteProduct);

module.exports = router;
