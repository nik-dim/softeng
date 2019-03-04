const express = require('express');
const router = express.Router();
const PricesController = require('../controllers/prices');
const checkAuth = require('../middleware/check-auth');
const authorize = require('../middleware/authorize');
const checkBlacklist = require('../middleware/checkBlacklist');



router.get('/', PricesController.prices_get_all);

router.post('/', checkBlacklist, checkAuth, authorize(['User', 'Admin']), PricesController.price_create_price);

router.get('/:id', PricesController.price_get_price);

router.put('/:id', checkBlacklist, checkAuth, authorize(['User', 'Admin']), PricesController.prices_put_price);

router.patch('/:id', checkBlacklist, checkAuth, authorize(['User', 'Admin']), PricesController.prices_patch_price);

router.delete('/:id', checkBlacklist, checkAuth, authorize(['User', 'Admin']), PricesController.prices_delete_price);

module.exports = router;