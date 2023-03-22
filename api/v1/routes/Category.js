import express from 'express';
import CategoryController from '../controllers/Category.js';
import validate from '../middleware/validate.js';
import { createValidation, updateValidation } from '../validation/Category.js';
import idChecker from '../middleware/idChecker.js';

const router = express.Router();

router.get('/', CategoryController.index);
router.get('/:id', CategoryController.getOneById);
router.route('/').post(validate(createValidation), CategoryController.create);
router.route('/:id').patch(idChecker(), validate(updateValidation), CategoryController.update);
router.route('/:id').delete(idChecker(), CategoryController.deleteCategory);

export default router;
