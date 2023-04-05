import BaseService from './Base.js';
import BaseModel from '../models/Product.js';

class ProductService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list() {
    return BaseModel.find().populate({
      path: 'userId',
      select: 'firstName lastName email location rate profileImage',
    }).populate({
      path: 'categoryId',
      select: 'name',
    }).populate({
      path: 'acceptedCategories',
      select: 'name',
    })
      .populate('incomingOffers.userId');
  }

  findOneById(id) {
    return BaseModel.findOne({ _id: id }).populate({
      path: 'userId',
      select: 'firstName lastName email location rate profileImage',
    }).populate({
      path: 'categoryId',
      select: 'name',
    }).populate({
      path: 'acceptedCategories',
      select: 'name',
    })
      .populate('incomingOffers.userId');
  }

  getMine(userId) {
    return BaseModel.find({ userId }).populate({
      path: 'userId',
      select: 'firstName lastName email location rate profileImage',
    }).populate({
      path: 'categoryId',
      select: 'name',
    }).populate({
      path: 'acceptedCategories',
      select: 'name',
    })
      .populate('incomingOffers.userId');
  }

  getOthers(userId) {
    return BaseModel.find({ userId: { $ne: userId } }).populate({
      path: 'userId',
      select: 'firstName lastName email location rate profileImage',
    }).populate({
      path: 'categoryId',
      select: 'name',
    }).populate({
      path: 'acceptedCategories',
      select: 'name',
    })
      .populate('incomingOffers.userId');
  }
}

export default new ProductService();
