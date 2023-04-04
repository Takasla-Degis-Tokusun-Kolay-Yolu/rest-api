import httpStatus from 'http-status';
import ProductService from '../services/Product.js';
import UserService from '../services/User.js';

const ProductAuthorization = (req, res, next) => {
  const { user } = req;
  const productId = req.params?.id;
  UserService.findOne({ _id: user._id })
    .then((requestUserId) => {
      ProductService.findOneById(productId)
        .then((productData) => {
          productData = {
            ...productData.toObject(),
          };
          if (productData.userId._id.toString() !== requestUserId._id.toString()) {
            res.status(httpStatus.UNAUTHORIZED).send({
              success: false, message: 'You are not authorized to perform this action.',
            });
          } else {
            next();
          }
        });
    });
};

export default ProductAuthorization;
