const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const parser = require('../middleware/parser');

exports.orders_get_all = (req, res, next) => {
    const params = parser.parse_query_params(req, res, next);
    Order.find(params.params_search)
        .limit(params.count)
        .select('product quantity _id')
        .populate('product', 'name')
        .sort(params.params_sort)
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: process.env.BASE_URL + 'orders/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}


exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            return order.save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                request: {
                    type: 'GET',
                    url: process.env.BASE_URL + 'orders/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(400).json({
                    mesage: 'Order not found'
                })
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: process.env.BASE_URL + 'orders/' + order._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}



exports.orders_delete_order = (req, res, next) => {
    Order.remove({
            _id: req.params.orderId
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}