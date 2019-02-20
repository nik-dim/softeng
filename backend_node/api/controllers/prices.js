const mongoose = require('mongoose');
const Price = require('../models/price');
const Product = require('../models/product');
const User = require('../models/user');
const Shop = require('../models/shop');

const parser = require('../middleware/parser');

exports.prices_get_all = (req, res, next) => {
    const params = parser.parse_prices_query_params(req.query);
    console.log(new Date());
    console.log(params);
    // Price.aggregate()
    Price.find(params.params_search)
        // .select('product quantity _id')
        .populate('product', 'name')
        .populate('user', 'email')
        .populate('shop', 'name')
        .skip(Number(params.start))
        .limit(Number(params.count))
        .sort(params.params_sort)
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                prices: docs.map(doc =>{
                    return {
                        _id: doc._id,
                        product: doc.product,
                        user: doc.user,
                        shop: doc.shop,
                        value: doc.value,
                        timestamp: doc.timestamp,
                        request: {
                            type: 'GET',
                            url: process.env.BASE_URL + 'prices/' + doc._id
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


exports.price_create_price = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product){
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            // console.log(product);
            // console.log(req.body);
            User.findById(req.body.userId)
                .then(user => {
                    if (!user){
                        return res.status(404).json({
                            message: 'User not found'
                        });
                    }
                    // console.log(user);
                    Shop.findById(req.body.shopId)
                        .then(shop => {
                            if (!shop){
                                return res.status(404).json({
                                    message: 'Shop not found'
                                });
                            }
                            const price = new Price({
                                _id: new mongoose.Types.ObjectId(),
                                product: req.body.productId,
                                user: req.body.userId,
                                shop: req.body.shopId,
                                value: req.body.value
                            })
                            console.log(price)
                            return price.save()
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .then(result => {
            // result is UNDEFINED???
            console.log(result);
            res.status(201).json({
                message: 'Price stored',
                result: result,
                request: {
                    type: 'GET',
                    // url: process.env.BASE_URL + 'prices/' + result._id
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

exports.price_get_price = (req, res, next) => {
    console.log(req.params.priceId);
    Price.findById(req.params.priceId)
        .exec()
        .then(price => {
            if (!price) {
                return res.status(400).json({
                    mesage: 'Price not found'
                })
            }
            res.status(200).json({
                price: price,
                request: {
                    type: 'GET',
                    url: process.env.BASE_URL + 'prices/'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}



exports.prices_delete_price = (req, res, next) => {
    Price.remove({ _id: req.params.priceId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Price deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}