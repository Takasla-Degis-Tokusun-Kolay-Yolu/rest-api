import BaseService from './Base.js';
import BaseModel from '../models/User.js';

class UserService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  findOneById(id) {
    return BaseModel.findOne({ _id: id }).select('-password');
  }
}

export default new UserService();
