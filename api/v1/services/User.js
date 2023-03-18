import BaseService from './Base.js';
import BaseModel from '../models/User.js';

class UserService extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

export default new UserService();
