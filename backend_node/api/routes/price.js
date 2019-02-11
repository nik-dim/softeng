const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const authorize = require('../middleware/authorize');
const PricesController = require( '../controllers/prices');

router.get('/', PricesController.prices_get_all);

router.post('/', PricesController.price_create_price);

router.get('/:priceId', PricesController.price_get_price);

router.delete('/:priceId', PricesController.prices_delete_price);

module.exports = router;