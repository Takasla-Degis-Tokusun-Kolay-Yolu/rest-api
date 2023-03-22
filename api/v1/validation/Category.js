import Joi from 'joi';

export const createValidation = Joi.object({
  name: Joi.string().required(),
});

export const updateValidation = Joi.object({
  name: Joi.string().required(),
});
