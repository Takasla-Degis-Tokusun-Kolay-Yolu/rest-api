import Mongoose from 'mongoose';

const ProductSchema = new Mongoose.Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    categoryId: {
      type: [Mongoose.Schema.Types.ObjectId],
      ref: 'Category',
      required: true,
    },
    usageLevel: {
      // 0: new, 1: enough, 2: used
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
    },
    incomingOffers: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        userId: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    acceptedCategories: {
      type: [Mongoose.Schema.Types.ObjectId],
      ref: 'Category',
    },
  },
  { timestamps: true, versionKey: false },
);

export default Mongoose.model('Product', ProductSchema);
