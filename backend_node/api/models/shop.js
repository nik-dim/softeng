const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  loc: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  // lng: { type: Number, required: true},
  // lat: { type: Number, required: true},
  withdrawn: {
    type: Boolean,
    default: false
  },
  brand: {
    type: String,
    required: true
  }
});

// shopSchema.index({ "loc": "2dsphere" });

module.exports = mongoose.model('Shop', shopSchema);