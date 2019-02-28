const mongoose = require('mongoose');
const Product = require('../models/product');
const parser = require('../middleware/parser');



function showSingleProduct(result) {
    return {
        _id: result._id,
        name: result.name,
        description: result.description,
        category: result.category,
        // tags:
        withdrawn: result.withdrawn,
        // request: {
        //     type: 'GET',
        //     url: process.env.BASE_URL + 'products/' + result._id
        // }
    }
};


exports.products_get_all = (req, res, next) => {
    const params = parser.parse_query_params(req.query);
    Product.countDocuments({}, function (err, count) {
        // console.log("Number of users:", count);
        // return count;
    }).then(total => {
        Product.find(params.params_search)
            .skip(Number(params.start))
            .limit(Number(params.count))
            .sort(params.params_sort)
            .exec()
            .then(docs => {
                const response = {
                    start: params.start,
                    count: docs.length,
                    total: total,
                    products: docs.map(doc => showSingleProduct(doc))
                }
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    })
}


exports.products_create_product = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        // tags:
        withdrawn: req.body.withdrawn
    });
    console.log(product);
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: showSingleProduct(result)
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


exports.products_get_product = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .select('_id name description category withdrawn')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided id'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


exports.products_patch_product = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateOps[key] = value;
    }
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    console.log(updateOps)
    Product.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated',
                product: result,
                request: {
                    type: 'GET',
                    url: process.env.BASE_URL + 'products/' + id
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


exports.products_put_product = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateOps[key] = value;
    }
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    Product.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            Product.findById(id)
                .select('_id name description category withdrawn')
                .exec()
                .then(product =>
                    res.status(200).json({
                        message: 'Product FULLY updated',
                        product: product
                        // request: {
                        //     type: 'GET',
                        //     url: process.env.BASE_URL + 'products/' + id
                        // }
                    })
                )
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}



exports.products_delete_product = (req, res, next) => {
    const id = req.params.id;
    // console.log(req.userData);
    if (req.userData.role == 'User') {
        console.log('User')
        updateOps = {}
        updateOps['withdrawn'] = true;
        Product.update({
                _id: id
            }, {
                $set: updateOps
            })
            .exec()
            .then(result =>
                res.status(200).json({
                    message: 'OK'
                })
            )
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } else if (req.userData.role == 'Admin') {
        console.log('Admin')
        Product.remove({
                _id: id
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'OK'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
}