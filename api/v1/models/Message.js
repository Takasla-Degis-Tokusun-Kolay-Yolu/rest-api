const Mongoose = require('mongoose');

const MessageSchema = new Mongoose.Schema({
  sender: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  offerId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    required: true,
  },
  isSenderOkay: {
    type: Boolean,
    default: false,
  },
  isReceiverOkay: {
    type: Boolean,
    default: false,
  },
  isFinalAgreement: {
    type: Boolean,
    default: false,
  },
  isDeliveredToSender: {
    type: Boolean,
    default: false,
  },
  isDeliveredToReceiver: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model('Message', MessageSchema);
