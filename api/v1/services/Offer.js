import BaseService from './Base.js';
import BaseModel from '../models/Offer.js';

class OfferService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  index() {
    return BaseModel.find()
      .populate('advertiserUser')
      .populate('advertiserProducts')
      .populate('applicantUser')
      .populate('applicantProducts');
  }

  findOneById(id) {
    return BaseModel.findOne({ _id: id });
  }
}

export default new OfferService();
