const Mongoose = require('mongoose');

const OfferSchema = new Mongoose.Schema({
  addsProduct: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  addsUser: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  offerProduct: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  offerUser: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model('Offer', OfferSchema);
