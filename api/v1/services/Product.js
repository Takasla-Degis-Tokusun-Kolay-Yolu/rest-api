import BaseService from './Base.js';
import BaseModel from '../models/Product.js';

class ProductService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  findOneById(id) {
    return BaseModel.findOne({ _id: id });
  }
}

export default new ProductService();
