import Mongoose from 'mongoose';

const CategorySchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export default Mongoose.model('Category', CategorySchema);
