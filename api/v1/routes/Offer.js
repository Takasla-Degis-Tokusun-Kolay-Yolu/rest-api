import express from 'express';
import OfferController from '../controllers/Offer.js';
import validate from '../middleware/validate.js';
import { createValidation, updateValidation } from '../validation/Offer.js';
import idChecker from '../middleware/idChecker.js';
import authenticateToken from '../middleware/authenticate.js';
import OfferAuthorization from '../middleware/OfferAuthorization.js';
import DeleteOfferAuthorization from '../middleware/DeleteOfferAuthorization.js';

const router = express.Router();

router.get('/', OfferController.index);
router.get('/mine', authenticateToken, OfferController.getMyOffers);
router.get('/:id', OfferController.getOneById);
router.route('/').post(authenticateToken, validate(createValidation), OfferController.create);
router.route('/:id').patch(idChecker(), authenticateToken, validate(updateValidation), OfferController.update);
router.route('/:id/accept').patch(idChecker(), authenticateToken, OfferAuthorization, OfferController.acceptOffer);
router.route('/:id/reject').patch(idChecker(), authenticateToken, validate(updateValidation), OfferController.rejectOffer);
router.route('/:id').delete(idChecker(), authenticateToken, DeleteOfferAuthorization, OfferController.deleteOffer);

export default router;
