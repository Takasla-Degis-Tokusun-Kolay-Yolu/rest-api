import BaseService from './Base.js';
import BaseModel from '../models/Category.js';
import ProductModel from '../models/Product.js';

class CategoryService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  findOneById(id) {
    return BaseModel.findOne({ _id: id });
  }

  getProductsByCategoryId(id) {
    return ProductModel.find({ categoryId: {$in: [id]}})
  }

}

export default new CategoryService();
