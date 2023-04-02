import BaseService from './Base.js';
import BaseModel from '../models/Offer.js';

class OfferService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  findOneById(id) {
    return BaseModel.findOne({ _id: id });
  }
}

export default new OfferService();
