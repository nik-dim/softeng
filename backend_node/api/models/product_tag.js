const mongoose = require('mongoose');

const productTagSchena = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    value: { type: String, required: true }
});

module.exports = mongoose.model('Product_tag', productTagSchena);