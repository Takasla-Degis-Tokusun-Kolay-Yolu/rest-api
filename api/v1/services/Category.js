import BaseService from './Base.js';
import BaseModel from '../models/Category.js';

class CategoryService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  findOneById(id) {
    return BaseModel.findOne({ _id: id });
  }
}

export default new CategoryService();
