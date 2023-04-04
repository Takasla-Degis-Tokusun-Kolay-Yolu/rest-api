import Joi from 'joi';

export const createValidation = Joi.object({
  userId: Joi.string(),
  name: Joi.string().required(),
  description: Joi.string(),
  image: Joi.string().required(),
  categoryId: Joi.array().items(Joi.string()).required(),
  usageLevel: Joi.number().required().min(0).max(2),
  tags: Joi.array().items(Joi.string()),
  incomingOffers: Joi.array().items(Joi.string()),
  acceptedCategories: Joi.array().items(Joi.string()),
});

export const updateValidation = Joi.object({
  userId: Joi.string(),
  name: Joi.string(),
  description: Joi.string(),
  image: Joi.string(),
  categoryId: Joi.array().items(Joi.string()),
  usageLevel: Joi.number(),
  tags: Joi.array().items(Joi.string()),
  incomingOffers: Joi.array().items(Joi.string()),
  acceptedCategories: Joi.array().items(Joi.string()),
});
