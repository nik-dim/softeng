const mongoose = require('mongoose');
const Shop = require('../models/shop');


exports.shops_get_all = (req, res, next) => {
    Shop.find()
        // .select('name price _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                shops: docs.map(doc => {
                    return {
                        name: doc.name,
                        lng: doc.lng,
                        lat: doc.lat,
                        brand: doc.brand,
                        withdrawn: doc.withdrawn,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8765/shops/' + doc._id
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


exports.shops_create_shop = (req, res, next) => {
    const shop = new Shop({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        lng: req.body.lng,
        lat: req.body.lat,
        brand: req.body.brand
    });
    shop
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created shop successfully',
                createdShop: {
                    name: result.name,
                    lng: result.lng,
                    lat: result.lat,
                    brand: result.brand,
                    withdrawn: result.withdrawn,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8765/shops/' + result._id
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


exports.shops_get_shop = (req, res, next) => {
    const id = req.params.id;
    Shop.findById(id)
        // .select('name price _id')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc){
                res.status(200).json({
                    shop: doc,
                    request: { 
                        type: 'GET',
                        url: 'http://localhost:8765/shops/' + doc._id
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


exports.shops_patch_shop = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update( { _id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Shop updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:8765/shops/' + id
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


exports.shops_delete_shop = (req, res, next) => {
    const id = req.params.id;
    Shop.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'shop deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}