import UserModel from '../models/User.js';

const insert = async (data) => {
  const user = new UserModel(data);
  const savedUser = await user.save();
  delete savedUser.password;
  return savedUser.toObject();
};

const loginUser = (loginData) => UserModel.findOne(loginData);

const list = () => UserModel.find({});

const findOne = (email) => UserModel.findOne({ email });

const modify = (where, updateData) => UserModel.findOneAndUpdate(where, updateData, { new: true });

const remove = (id) => UserModel.findByIdAndDelete(id);

export default {
  insert,
  list,
  findOne,
  loginUser,
  modify,
  remove,
};
