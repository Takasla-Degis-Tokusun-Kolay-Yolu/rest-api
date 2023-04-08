import httpStatus from 'http-status';
import OfferService from '../services/Offer.js';
import ProductService from '../services/Product.js';

class Offer {
  index = (req, res) => {
    OfferService.list()
      .then((response) => {
        res.status(httpStatus.OK).send({
          success: true,
          data: response,
        });
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  };

  getOneById = (req, res) => {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        success: false,
        message: 'There is no ID value in the request!',
      });
    }
    OfferService.findOneById(req.params?.id)
      .then(((offer) => {
        if (!offer) {
          return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'There is no offer with the given ID!',
          });
        }
        res.status(httpStatus.OK).send({
          success: true,
          data: offer,
        });
      }))
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'An error occurred while retrieving the offer.',
        error: e,
      }));
  };

  create(req, res) {
    const { user } = req;
    req.body = {
      ...req.body,
      applicantUser: user._id,
    };
    OfferService.create(req.body)
      .then((response) => {
        response = {
          ...response.toObject(),
        };
        try {
          ProductService.findOneById(response.advertiserProducts).then((adProduct) => {
            adProduct.incomingOffers.push(response._id);
            adProduct.save();
          });

          res.status(httpStatus.CREATED).send({
            success: true,
            data: response,
          });
        } catch (e) {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: 'An error occurred while creating the offer.',
            error: e,
          });
        }
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          success: false,
          message: 'An error occurred while creating the offer.',
          error: e,
        });
      });
  }

  getMyOffers(req, res) {
    const { user } = req;
    OfferService.getMine(user._id)
      .then((response) => {
        res.status(httpStatus.CREATED).send({
          success: true,
          data: response,
        });
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          success: false,
          message: 'An error occurred while getting the your product.',
          error: e.message,
        });
      });
  }

  update(req, res) {
    const { user } = req;
    req.body.applicantUser = user._id;
    OfferService.update({ _id: req.params?.id }, req.body)
      .then((updatedOffer) => {
        res.status(httpStatus.OK).send({
          success: true,
          data: updatedOffer,
        });
      })
      .catch(() => res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'An error occurred while updating offer.' }));
  }

  deleteOffer(req, res) {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        success: false,
        message: 'There is no ID value in the request!',
      });
    }
    OfferService.delete(req.params?.id)
      .then((deletedOffer) => {
        if (!deletedOffer) {
          return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'There is no offer with the given ID!',
          });
        }
        res
          .status(httpStatus.OK)
          .send({
            success: true,
            message: 'The specified offer has been deleted.',
          });
      })
      .catch((error) => res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          success: false,
          error: 'Something went wrong when deleting offer.',
          message: error.message,
        }));
  }
}

export default new Offer();
