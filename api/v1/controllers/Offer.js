import httpStatus from 'http-status';
import OfferService from '../services/Offer.js';

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
    OfferService.create(req.body)
      .then((response) => {
        response = {
          ...response.toObject(),
        };
        res.status(httpStatus.CREATED).send({
          success: true,
          data: response,
        });
      })
      .catch((e) => {
        if (e.code === 11000) {
          return res.status(httpStatus.BAD_REQUEST).send({
            success: false,
            message: 'This offer name has already been taken.',
          });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          success: false,
          message: 'An error occurred while creating the offer.',
          error: e,
        });
      });
  }

  update(req, res) {
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
