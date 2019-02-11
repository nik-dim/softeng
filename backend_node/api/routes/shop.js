const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ShopsController = require('../controllers/shop');


router.get('/', ShopsController.shops_get_all);

router.post('/', ShopsController.shops_create_shop);

router.get('/:id', ShopsController.shops_get_shop);

// router.patch('/:id', checkAuth, ShopsController.products_patch_product);

// router.delete('/:id', checkAuth, ShopsController.products_delete_product);


module.exports = router;