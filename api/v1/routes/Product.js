import express from 'express';
import ProductController from '../controllers/Product.js';
import validate from '../middleware/validate.js';
import { createValidation, updateValidation } from '../validation/Product.js';
import idChecker from '../middleware/idChecker.js';
import authenticateToken from '../middleware/authenticate.js';
import ProductAuthorization from '../middleware/ProductAuthorization.js';

const router = express.Router();

router.get('/', ProductController.index);
router.get('/mine', authenticateToken, ProductController.getMyProducts);
router.get('/others', authenticateToken, ProductController.getOtherProducts);
router.get('/:id', ProductController.getOneById);
router.route('/').post(authenticateToken, validate(createValidation), ProductController.create);
router.route('/:id').patch(idChecker(), authenticateToken, ProductAuthorization, validate(updateValidation), ProductController.update);
router.route('/:id').delete(idChecker(), authenticateToken, ProductAuthorization, ProductController.deleteProduct);

export default router;
