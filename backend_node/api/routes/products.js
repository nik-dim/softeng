const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const authorize = require('../middleware/authorize');
const ProductsController = require('../controllers/products');


router.get('/', ProductsController.products_get_all);

router.post('/', checkAuth, authorize('User'), ProductsController.products_create_product);

router.get('/:id', ProductsController.products_get_product);

router.patch('/:id', checkAuth, authorize('User'), ProductsController.products_patch_product);

router.delete('/:id', checkAuth, authorize('User'),  ProductsController.products_delete_product);


module.exports = router;
