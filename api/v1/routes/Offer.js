import express from 'express';
import OfferController from '../controllers/Offer.js';
import validate from '../middleware/validate.js';
import { createValidation, updateValidation } from '../validation/Product.js';
import idChecker from '../middleware/idChecker.js';
import authenticateToken from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', OfferController.index);
router.get('/:id', OfferController.getOneById);
router.route('/').post(authenticateToken, validate(createValidation), OfferController.create);
router.route('/:id').patch(idChecker(), authenticateToken, validate(updateValidation), OfferController.update);
router.route('/:id').delete(idChecker(), authenticateToken, OfferController.deleteOffer);

export default router;
