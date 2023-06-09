import BaseService from './Base.js';
import BaseModel from '../models/Offer.js';

class OfferService extends BaseService {
  constructor() {
    super(BaseModel);
  }

  list() {
    return BaseModel.find()
      .populate({
        path: 'advertiserUser',
        select: 'firstName lastName email location rate profileImage',
      })
      .populate({ path: 'advertiserProducts', populate: { path: 'categoryId acceptedCategories' } })
      .populate({
        path: 'applicantUser',
        select: 'firstName lastName email location rate profileImage',
      })
      .populate({ path: 'applicantProducts', populate: { path: 'categoryId acceptedCategories' } });
  }

  findOneById(id) {
    return BaseModel.findOne({ _id: id }).populate({
      path: 'advertiserUser',
      select: 'firstName lastName email location rate profileImage',
    })
      .populate({ path: 'advertiserProducts', populate: { path: 'categoryId acceptedCategories' } })
      .populate({
        path: 'applicantUser',
        select: 'firstName lastName email location rate profileImage',
      })
      .populate({ path: 'applicantProducts', populate: { path: 'categoryId acceptedCategories' } });
  }

  getMine(userId) {
    return BaseModel.find({ applicantUser: userId }).populate({
      path: 'advertiserUser',
      select: 'firstName lastName email location rate profileImage',
    })
      .populate({ path: 'advertiserProducts', populate: { path: 'categoryId acceptedCategories' } })
      .populate({
        path: 'applicantUser',
        select: 'firstName lastName email location rate profileImage',
      })
      .populate({ path: 'applicantProducts', populate: { path: 'categoryId acceptedCategories' } });
  }

  acceptOffer(id) {
    return BaseModel.findOneAndUpdate({ _id: id }, { status: 1 }, { new: true })
      .populate({
        path: 'advertiserUser',
        select: 'firstName lastName email location rate profileImage',
      })
      .populate({ path: 'advertiserProducts', populate: { path: 'categoryId acceptedCategories' } })
      .populate({
        path: 'applicantUser',
        select: 'firstName lastName email location rate profileImage',
      })
      .populate({ path: 'applicantProducts', populate: { path: 'categoryId acceptedCategories' } });
  }

  rejectOffer(id) {
    return BaseModel.findOneAndUpdate({ _id: id }, { status: 2 }, { new: true })
      .populate({
        path: 'advertiserUser',
        select: 'firstName lastName email location rate profileImage',
      })
      .populate({ path: 'advertiserProducts', populate: { path: 'categoryId acceptedCategories' } })
      .populate({
        path: 'applicantUser',
        select: 'firstName lastName email location rate profileImage',
      })
      .populate({ path: 'applicantProducts', populate: { path: 'categoryId acceptedCategories' } });
  }

  getActiveUserIncomingOffers(userId) {
    return BaseModel.find({ advertiserUser: userId, status: 0 }).populate({
      path: 'advertiserUser',
      select: 'firstName lastName email location rate profileImage',
    })
      .populate({ path: 'advertiserProducts', populate: { path: 'categoryId acceptedCategories' } })
      .populate({
        path: 'applicantUser',
        select: 'firstName lastName email location rate profileImage',
      })
      .populate({ path: 'applicantProducts', populate: { path: 'categoryId acceptedCategories' } });
  }
}

export default new OfferService();
