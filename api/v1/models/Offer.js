import Mongoose from 'mongoose';

const OfferSchema = new Mongoose.Schema({
  advertiserUser: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  advertiserProducts: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  applicantUser: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  applicantProducts: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true, versionKey: false });

export default Mongoose.model('Offer', OfferSchema);
