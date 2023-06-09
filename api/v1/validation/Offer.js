import Joi from 'joi';

export const createValidation = Joi.object({
  advertiserProducts: Joi.string().required(),
  advertiserUser: Joi.string().required(),
  applicantProducts: Joi.string().required(),
  applicantUser: Joi.string(),
  isAccepted: Joi.boolean(),
});

export const updateValidation = Joi.object({
  applicantProducts: Joi.string(),
});
