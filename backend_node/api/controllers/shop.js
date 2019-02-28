const mongoose = require('mongoose');
const Shop = require('../models/shop');
const parser = require('../middleware/parser');

function showSingleShop(doc) {
    return {
        _id: doc._id,
        name: doc.name,
        // address
        lng: doc.loc.coordinates[0],
        lat: doc.loc.coordinates[1],
        // brand: doc.brand,
        // tags: 
        withdrawn: doc.withdrawn,
        // request: {
        //     type: 'GET',
        //     url: process.env.BASE_URL + 'shops/' + doc._id
        // }
    }
};

exports.shops_get_all = async (req, res, next) => {
    // console.log(req.headers)
    const params = parser.parse_query_params(req.query);
    // console.log(params)
    const n = await Shop.countDocuments();
    console.log(n)
    Shop.countDocuments()
        .then(total => {
            console.log(total);
            Shop.find(params.params_search)
                .skip(Number(params.start))
                .limit(Number(params.count))
                .sort(params.params_sort)
                .exec()
                .then(docs => {
                    const response = {
                        start: params.start,
                        count: docs.length,
                        total: total,
                        shops: docs.map(doc => showSingleShop(doc))
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


exports.shops_create_shop = (req, res, next) => {
    const shop = new Shop({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        loc: {
            type: 'Point',
            coordinates: [req.body.lng, req.body.lat]
        },
        brand: req.body.brand
    });
    shop
        .save()
        .then(doc => res.status(201).json(showSingleShop(doc)))
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
            // console.log(doc);
            if (doc) {
                res.status(200).json(showSingleShop(doc));
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



exports.shops_patch_shop = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateOps[key] = value;
    }
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    console.log(updateOps)
    Shop.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: 'Shop updated',
                shop: showSingleShop(doc)
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


exports.shops_put_shop = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateOps[key] = value;
    }
    Shop.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            Shop.findById(id)
                .select('_id name description category withdrawn')
                .exec()
                .then(doc =>
                    res.status(200).json({
                        message: 'Shop FULLY updated',
                        shop: showSingleShop(doc)
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



exports.shops_delete_shop = (req, res, next) => {
    const id = req.params.id;
    // console.log(req.userData);
    if (req.userData.role == 'User') {
        console.log('User')
        updateOps = {}
        updateOps['withdrawn'] = true;
        Shop.update({
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
        Shop.remove({
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