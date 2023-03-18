import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema({
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
}, { timestamps: true, versionKey: false });

export default Mongoose.model('User', UserSchema);
