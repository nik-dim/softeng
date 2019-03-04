const express = require('express');
const router = express.Router();
const PricesController = require('../controllers/prices');
const checkAuth = require('../middleware/check-auth');
const authorize = require('../middleware/authorize');
const checkBlacklist = require('../middleware/checkBlacklist');



router.get('/', PricesController.prices_get_all);

router.post('/', /*checkBlacklist, checkAuth, authorize('User', 'Admin'),*/ PricesController.price_create_price);

router.get('/:priceId', PricesController.price_get_price);

router.put('/:priceId', checkBlacklist, checkAuth, authorize(['User', 'Admin']), PricesController.prices_put_price);

router.patch('/:priceId', checkBlacklist, checkAuth, authorize(['User', 'Admin']), PricesController.prices_patch_price);

router.delete('/:priceId', checkBlacklist, checkAuth, authorize(['User', 'Admin']), PricesController.prices_delete_price);

router

module.exports = router;