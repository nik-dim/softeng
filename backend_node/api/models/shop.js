const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    lng: { type: Number, required: true},
    lat: { type: Number, required: true},
    withdrawn: { type: Boolean, default: false},
    brand: { type: String, required: true}
});

module.exports = mongoose.model('Shop', shopSchema);