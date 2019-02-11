const mongoose = require('mongoose');
const Product = require('../models/product');


exports.products_get_all = (req, res, next) => {
    Product.find()
        // .select('name price _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        description: doc.description,
                        category: doc.category,
                        // tags:
                        withdrawn: doc.withdrawn,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8765/products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
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
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    description: result.description,
                    category: result.category,
                    // tags:
                    withdrawn: result.withdrawn,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8765/products/' + result._id
                    }
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


exports.products_get_product = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc){
                res.status(200).json({
                    product: doc,
                    request: { 
                        type: 'GET',
                        url: 'http://localhost:8765/products/' + doc._id
                    }
                });
            } else {
                res.status(404).json({message: 'No valid entry found for provided id'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}


exports.products_patch_product = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update( { _id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:8765/products/' + id
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


exports.products_delete_product = (req, res, next) => {
    const id = req.params.id;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'product deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}