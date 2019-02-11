const mongoose = require('mongoose');
// const counter = require('../models/counterSchema');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1 }
});


// orderSchema.pre('save', function(next) {
//     var doc = this;
//     console.log(doc);
//     counter.findByIdAndUpdate({_id: 'orderId'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc._id = counter.seq;
//         next();
//     });
// });

module.exports = mongoose.model('Order', orderSchema);