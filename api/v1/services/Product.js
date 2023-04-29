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
      .populate('incomingOffers');
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
      .populate({
        path: 'incomingOffers',
        populate: [
          { path: 'applicantUser', select: 'firstName lastName email location rate profileImage' },
          { path: 'applicantProducts' },
        ],
      });
  }

  getUserProducts(userId) {
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
      .populate('incomingOffers');
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
      .populate({
        path: 'incomingOffers',
        populate: [
          { path: 'advertiserUser', select: 'firstName lastName email location rate profileImage' },
          { path: 'applicantUser', select: 'firstName lastName email location rate profileImage' },
          { path: 'advertiserProducts' },
          { path: 'applicantProducts' },
        ],
      });
  }
}

export default new ProductService();
