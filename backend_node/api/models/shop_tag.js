const mongoose = require('mongoose');

const shopTagSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shop: {type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true},
    value: { type: String, required: true }
});

module.exports = mongoose.model('Shop_tag', shopTagSchema);