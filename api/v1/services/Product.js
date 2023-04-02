import BaseService from './Base.js';
import BaseModel from '../models/Product.js';

class ProductService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list() {
    return BaseModel.find().populate('userId').populate('categoryId').populate('acceptedCategories')
      .populate('incomingOffers.userId');
  }

  findOneById(id) {
    return BaseModel.findOne({ _id: id });
  }

  create(data) {
    return BaseModel.create(data);
  }
}

export default new ProductService();
