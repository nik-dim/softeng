const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const authorize = require('../middleware/authorize');
const ShopsController = require('../controllers/shop');
const checkBlacklist = require('../middleware/checkBlacklist');

router.get('/', ShopsController.shops_get_all);

router.post('/', checkAuth, authorize('User'), ShopsController.shops_create_shop);

router.get('/:id', ShopsController.shops_get_shop);

// router.patch('/:id', checkAuth, ShopsController.products_patch_product);

// router.delete('/:id', checkAuth, ShopsController.products_delete_product);


module.exports = router;
