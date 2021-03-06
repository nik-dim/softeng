const mongoose = require('mongoose');
const Price = require('../models/price');
const Product = require('../models/product');
const User = require('../models/user');
const Shop = require('../models/shop');
const errorHandler = require('../middleware/errorHandler');

const parser = require('../middleware/parser');



exports.prices_get_all = (req, res, next) => {
    const params = parser.parse_prices_query_params(req, res, next);
    if (!params.BAD_REQUEST && !params.NOT_ENOUGH_PARAMS) {
        Shop.aggregate(params.pipeline.concat([{
                "$group": {
                    _id: null,
                    myCount: {
                        $sum: 1
                    }
                }
            }]))
            .exec()
            .then(result => {
                if (result.length > 0) {
                    // console.log(result[0].myCount);
                    Shop.aggregate(params.pipeline)
                        .skip(Number(params.start))
                        .limit(Number(params.count))
                        .sort(params.params_sort)
                        .exec()
                        .then(docs => {
                            res.status(200).json({
                                start: params.start,
                                count: params.count,
                                total: result[0].myCount,
                                prices: docs.map(doc => {
                                    // console.log(doc);
                                    const temp = {
                                        _id: doc.prices._id,
                                        price: doc.prices.price,
                                        date: doc.prices.dateFrom.toISOString().substring(0, 10),
                                        productName: doc.product.name,
                                        productId: doc.product._id,
                                        productTags: doc.product.tags,
                                        shopId: doc._id,
                                        shopName: doc.name,
                                        shopTags: doc.tags,
                                        shopDist: ((doc.dist) ? doc.dist.calculated / 1000 : 0)
                                    }
                                    console.log(temp);
                                    return temp;
                                })
                            });
                        })
                        .catch(err => errorHandler.errorHandler(err, res));
                } else {
                    res.status(404).json('No prices found')
                }
            })
            .catch(err => errorHandler.errorHandler(err, res));
    }
}


exports.price_create_price = (req, res, next) => {
    const params = parser.parse_query_params(req, res, next);
    if (!params.BAD_REQUEST && errorHandler.validateAttributes(req.body, Price, res)) {
        Product.findById(req.body.productId)
            .then(product => {
                if (!product) {
                    return res.status(404).json({
                        message: 'Product not found'
                    });
                }
                User.findById(req.body.userId)
                    .then(user => {
                        // if (!user) {
                            // return res.status(404).json({
                                // message: 'User not found'
                            // });
                        // }
                        // console.log(user);
                        Shop.findById(req.body.shopId)
                            .then(shop => {
                                if (!shop) {
                                    return res.status(404).json({
                                        message: 'Shop not found'
                                    });
                                }

                                var from = req.body.dateFrom.split("-");
                                var to = req.body.dateTo.split("-");
                                from = from.map(a => parseInt(a))
                                to = to.map(a => parseInt(a))
                                const price = new Price({
                                    _id: new mongoose.Types.ObjectId(),
                                    productId: req.body.productId,
                                    // userId: req.body.userId,
                                    shopId: req.body.shopId,
                                    price: req.body.price,
                                    dateFrom: new Date(Date.UTC(from[0], from[1] - 1, from[2], 0, 0, 0)),
                                    dateTo: new Date(Date.UTC(to[0], to[1] - 1, to[2] - 1, 0, 0, 0)),
                                })
                                // console.log(price)

                                price.save()
                                    .then(result => {
                                      console.log({
                                        start: 0,
                                        count: 1,
                                        total: 1,
                                        prices: {
                                          price: result.price,
                                          date: result.dateFrom,
                                          productName: product.name,
                                          productId: result.productId,
                                          productTags: product.tags,
                                          shopId: result.shopId,
                                          shopName: shop.name,
                                          shopTags: shop.tags,
                                          shopAddress: shop.address,
                                          shopDist: 0,
                                        }
                                      })
                                      res.status(201).json({
                                          start: 0,
                                          count: 1,
                                          total: 1,
                                          prices: [{
                                            price: result.price,
                                            date: result.dateFrom,
                                            productName: product.name,
                                            productId: result.productId,
                                            productTags: product.tags,
                                            shopId: result.shopId,
                                            shopName: shop.name,
                                            shopTags: shop.tags,
                                            shopAddress: shop.address,
                                            shopDist: 0,
                                          }]
                                      })
                                    })
                                    .catch(err => errorHandler.errorHandler(err, res));



                            })
                            .catch(err => errorHandler.errorHandler(err, res));
                    })
                    .catch(err => errorHandler.errorHandler(err, res));
            })
            // .then(result => {
            //     res.status(201).json({
            //         message: 'Price stored',
            //         result: result
            //     });
            // })
            .catch(err => errorHandler.errorHandler(err, res));
    }
}

exports.price_get_price = (req, res, next) => {
    const params = parser.parse_query_params(req, res, next);
    if (!params.BAD_REQUEST && !parser.validate_id(req, res, next)) {
        // console.log(req.params.id);
        Price.findById(req.params.id)
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
            .catch(err => errorHandler.errorHandler(err, res))
    }
}




exports.prices_patch_price = (req, res, next) => {
    const params = parser.parse_query_params(req, res, next);
    if (!params.BAD_REQUEST && !parser.validate_id(req, res, next)) {
        const id = req.params.id;
        const updateOps = {};
        for (const [key, value] of Object.entries(req.body)) {
            updateOps[key] = value;
        }
        // console.log(updateOps)
        Price.update({
                _id: id
            }, {
                $set: updateOps
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Price updated',
                    price: result,
                });
            })
            .catch(err => errorHandler.errorHandler(err, res));
    }
}


exports.prices_put_price = (req, res, next) => {
    const params = parser.parse_query_params(req, res, next);
    if (!params.BAD_REQUEST && !parser.validate_id(req, res, next) && errorHandler.validateAttributes(req.body, Price, res)) {
        const id = req.params.id;
        const updateOps = {};
        for (const [key, value] of Object.entries(req.body)) {
            updateOps[key] = value;
        }
        Price.update({
                _id: id
            }, {
                $set: updateOps
            })
            .exec()
            .then(result => {
                Product.findById(id)
                    // .select('_id name description category withdrawn')
                    .exec()
                    .then(price =>
                        res.status(200).json({
                            message: 'Price FULLY updated',
                            price: price
                        })
                    )
            })
            .catch(errorHandler.errorHandler(err, res));
    }
}



exports.prices_delete_price = (req, res, next) => {
    const params = parser.parse_query_params(req, res, next);
    if (!params.BAD_REQUEST && !parser.validate_id(req, res, next)) {
        Price.remove({
                _id: req.params.id
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Price deleted'
                });
            })
            .catch(err => errorHandler.errorHandler(err, res))
    }
}
