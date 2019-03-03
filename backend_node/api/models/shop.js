const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  loc: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  Address: {
    type: String,
    required: true
  },
  withdrawn: {
    type: Boolean,
    default: false
  },
  brand: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }]
});

// shopSchema.index({ "loc": "2dsphere" });

module.exports = mongoose.model('Shop', shopSchema);