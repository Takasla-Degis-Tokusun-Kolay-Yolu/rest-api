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
    .populate({
      path: 'userId',
      select: 'firstName lastName email location rate profileImage',
    }).populate({
      path: 'categoryId',
      select: 'name',
    }).populate({
      path: 'acceptedCategories',
      select: 'name',
    })
      .populate('incomingOffers');
  }

}

export default new CategoryService();
