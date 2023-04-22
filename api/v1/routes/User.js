import express from 'express';
import UserController from '../controllers/User.js';
import validate from '../middleware/validate.js';
import {
  changePasswordValidation,
  createValidation,
  loginValidation,
  updateUserValidation,
} from '../validation/User.js';
import authenticateToken from '../middleware/authenticate.js';
import idChecker from '../middleware/idChecker.js';

const router = express.Router();

router.get('/', UserController.index);
router.route('/active').get(authenticateToken, UserController.getActiveUser);
router.get('/:id', UserController.getOneById);
router.route('/').post(validate(createValidation), UserController.create);
router.route('/').patch(authenticateToken, validate(updateUserValidation), UserController.update);
router.route('/login').post(validate(loginValidation), UserController.login);

router.route('/change-password').patch(authenticateToken, validate(changePasswordValidation), UserController.changePassword);

// We have to check if the id is valid before we authenticate the token
router.route('/:id').delete(idChecker(), authenticateToken, UserController.deleteUser);

export default router;
