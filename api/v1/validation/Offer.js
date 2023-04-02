import Joi from 'joi';

export const createValidation = Joi.object({
  addsProduct: Joi.string().required(),
  addsUser: Joi.string().required(),
  offerProduct: Joi.string().required(),
  offerUser: Joi.string().required(),
  isAccepted: Joi.boolean(),
});

export const updateValidation = Joi.object({
  addsProduct: Joi.string(),
  addsUser: Joi.string(),
  offerProduct: Joi.string(),
  offerUser: Joi.string(),
  isAccepted: Joi.boolean(),
});
