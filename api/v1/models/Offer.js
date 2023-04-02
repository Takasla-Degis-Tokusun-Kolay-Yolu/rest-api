import Mongoose from 'mongoose';

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

export default Mongoose.model('Offer', OfferSchema);
