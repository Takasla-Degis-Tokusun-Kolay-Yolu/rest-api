import httpStatus from 'http-status';
import OfferService from '../services/Offer.js';
import UserService from '../services/User.js';

const DeleteOfferAuthorization = (req, res, next) => {
  const { user } = req;
  const offerId = req.params?.id;
  UserService.findOne({ _id: user._id })
    .then((requestUserId) => {
      OfferService.findOneById(offerId)
        .then((offerData) => {
          offerData = {
            ...offerData.toObject(),
          };
          if (offerData.applicantUser._id.toString() !== requestUserId._id.toString()) {
            res.status(httpStatus.UNAUTHORIZED).send({
              success: false, message: 'You are not authorized to perform this action.',
            });
          } else {
            next();
          }
        });
    });
};

export default DeleteOfferAuthorization;
