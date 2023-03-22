import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    profileImage: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    rate: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

export default Mongoose.model('User', UserSchema);
