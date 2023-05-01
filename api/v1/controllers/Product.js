import httpStatus from 'http-status';
import ProductService from '../services/Product.js';

class Product {
  index = (req, res) => {
    ProductService.list()
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
    ProductService.findOneById(req.params?.id)
      .then(((product) => {
        if (!product) {
          return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'There is no product with the given ID!',
          });
        }
        res.status(httpStatus.OK).send({
          success: true,
          data: product,
        });
      }))
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'An error occurred while retrieving the product.',
        error: e,
      }));
  };

  create(req, res) {
    const { user } = req;
    req.body = {
      ...req.body,
      userId: user._id,
    };
    ProductService.create(req.body)
      .then((response) => {
        response = {
          ...response.toObject(),
        };
        ProductService.findOneById(response._id).then((product) => {
          res.status(httpStatus.OK).send({
            success: true,
            data: product,
          });
        });
      })
      .catch((e) => {
        if (e.code === 11000) {
          return res.status(httpStatus.BAD_REQUEST).send({
            success: false,
            message: 'This product name has already been taken.',
          });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          success: false,
          message: 'An error occurred while creating the product.',
          error: e,
        });
      });
  }

  update(req, res) {
    ProductService.update({ _id: req.params?.id }, req.body)
      .then((updatedProduct) => {
        updatedProduct = {
          ...updatedProduct.toObject(),
        };
        ProductService.findOneById(updatedProduct._id).then((product) => {
          res.status(httpStatus.OK).send({
            success: true,
            data: product,
          });
        });
      })
      .catch((e) => {
        if (e.code === 11000) {
          return res.status(httpStatus.BAD_REQUEST).send({
            success: false,
            message: 'This product name has already been taken.',
          });
        }
      })
      .catch(() => res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'An error occurred while updating product.' }));
  }

  deleteProduct(req, res) {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        success: false,
        message: 'There is no ID value in the request!',
      });
    }
    ProductService.delete(req.params?.id)
      .then((deletedProduct) => {
        if (!deletedProduct) {
          return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'There is no product with the given ID!',
          });
        }
        res
          .status(httpStatus.OK)
          .send({
            success: true,
            message: 'The specified product has been deleted.',
          });
      })
      .catch((error) => res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          success: false,
          error: 'Something went wrong when deleting product.',
          message: error.message,
        }));
  }

  getUserProducts(req, res) {
    ProductService.getUserProducts(req.params?.id)
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

  getOtherProducts(req, res) {
    const { user } = req;
    ProductService.getOthers(user._id)
      .then((response) => {
        res.status(httpStatus.CREATED).send({
          success: true,
          data: response,
        });
      })
      .catch((e) => {
        if (e.code === 11000) {
          return res.status(httpStatus.BAD_REQUEST).send({
            success: false,
            message: 'This product name has already been taken.',
          });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          success: false,
          message: 'An error occurred while getting the your product.',
          error: e.message,
        });
      });
  }
}

export default new Product();
