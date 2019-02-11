const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const authorize = require('../middleware/authorize');
const OrdersController = require( '../controllers/orders');

router.get('/', /*checkAuth, authorize('User'),*/ OrdersController.orders_get_all);

router.post('/', OrdersController.orders_create_order);

router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

module.exports = router;