import express from 'express';
import UserController from '../controllers/User.js';
import validate from '../middleware/validate.js';
import { createValidation, loginValidation } from '../validation/User.js';

const router = express.Router();

router.get('/', UserController.index);
router.route('/').post(validate(createValidation), UserController.create);
router.route('/login').post(validate(loginValidation), UserController.login);

export default router;
