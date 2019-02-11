const mongoose = require('mongoose');

const priceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    shop: {type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true},
    value: { type: Number, required: true },
    timestamp: { type:Date, default: Date.now}
});

module.exports = mongoose.model('Price', priceSchema);