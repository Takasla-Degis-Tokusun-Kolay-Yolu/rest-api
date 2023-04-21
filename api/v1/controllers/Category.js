import httpStatus from 'http-status';
import CategoryService from '../services/Category.js';

class Category {
  index = (req, res) => {
    CategoryService.list()
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
	  CategoryService.findOneById(req.params?.id)
      .then((category) => {
        if (!category) {
          return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'There is no category with the given ID!',
          });
        }
        try {
          CategoryService.getProductsByCategoryId(req.params?.id).then((products) => {
            category = {
              ...category.toObject(),
              products,
            };
            res.status(httpStatus.OK).send({
              success: true,
              data: category,
            });
          } )
        } catch (e) {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: 'An error occurred while retrieving the products via category.',
            error: e,
          });
        }
        
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'An error occurred while retrieving the category.',
        error: e,
      }));
  };



  create(req, res) {
    CategoryService.create(req.body)
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
            message: 'This category name has already been taken.',
          });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          success: false,
          message: 'An error occurred while creating the category.',
          error: e,
        });
      });
  }

  update(req, res) {
    CategoryService.update({ _id: req.params?.id }, req.body)
      .then((updatedCategory) => {
        res.status(httpStatus.OK).send({
          success: true,
          data: updatedCategory,
        });
      })
      .catch(() => res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'An error occurred while updating category.' }));
  }

  deleteCategory(req, res) {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        success: false,
        message: 'There is no ID value in the request!',
      });
    }
    CategoryService.delete(req.params?.id)
      .then((deletedCategory) => {
        if (!deletedCategory) {
          return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'There is no category with the given ID!',
          });
        }
        res
          .status(httpStatus.OK)
          .send({
            success: true,
            message: 'The specified category has been deleted.',
          });
      })
      .catch((error) => res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          success: false,
          error: 'Something went wrong when deleting cateory.',
          message: error.message,
        }));
  }
}

export default new Category();
