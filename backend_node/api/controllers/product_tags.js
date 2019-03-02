// const mongoose = require('mongoose');
// const ProductTag = require('../models/product_tag');
// const Product = require('../models/product');

// const parser = require('../middleware/parser');



// exports.productTags_get_all = (req, res, next) => {
//     const params = parser.parse_prices_query_params(req, res, next);
//     if (!params.BAD_REQUEST) {
//         ProductTag.find()
//             .skip(Number(params.start))
//             .limit(Number(params.count))
//             // .sort(params.params_sort)
//             .exec()
//             .then(docs => {
//                 console.log(docs);
//                 res.status(200).json(
//                     docs
//                 );
//             })
//             .catch(err => {
//                 res.status(500).json({
//                     error: err
//                 });
//             });
//     }
// }


// exports.productTags_post = (req, res, next) => {
//     const params = parser.parse_query_params(req, res, next);
//     if (!params.BAD_REQUEST) {
//         Product.findById(req.body.productId)
//             .then(product => {
//                 if (!product) {
//                     return res.status(404).json({
//                         message: 'Product not found'
//                     });
//                 }
//                 const productTag = new ProductTag({
//                     _id: new mongoose.Types.ObjectId(),
//                     product: req.body.productId,
//                     value: req.body.value
//                 })
//                 return productTag
//                     .save()
//                     .then(result => {
//                         // result is UNDEFINED???
//                         console.log(result);
//                         res.status(201).json({
//                             message: 'Product Tag stored',
//                             result: result,
//                             request: {
//                                 type: 'GET',
//                                 // url: process.env.BASE_URL + 'prices/' + result._id
//                             }
//                         });
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         res.status(500).json({
//                             error: err
//                         });
//                     });
//             })
//     }
// }

// exports.productTags_get = (req, res, next) => {
//     const params = parser.parse_query_params(req, res, next);
//     if (!params.BAD_REQUEST && !parser.validate_id(req, res, next)) {
//         console.log(req.params.id);
//         ProductTag.findById(req.params.id)
//             .exec()
//             .then(result => {
//                 if (!result) {
//                     return res.status(400).json({
//                         mesage: 'Product Tag not found'
//                     })
//                 }
//                 res.status(200).json(result);
//             })
//             .catch(err => {
//                 res.status(500).json({
//                     error: err
//                 });
//             })
//     }
// }



// // exports.prices_delete_price = (req, res, next) => {
// //     const params = parser.parse_query_params(req, res, next);
// //     if (!params.BAD_REQUEST && !parser.validate_id(req, res, next)) {
// //         Price.remove({
// //                 _id: req.params.priceId
// //             })
// //             .exec()
// //             .then(result => {
// //                 res.status(200).json({
// //                     message: 'Price deleted'
// //                 });
// //             })
// //             .catch(err => {
// //                 res.status(500).json({
// //                     error: err
// //                 });
// //             })
// //     }
// // }