import Joi from 'joi';

export const createValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  rePassword: Joi.string().required().valid(Joi.ref('password')),
  profileImage: Joi.string(),
  location: Joi.string().required(),
});

export const loginValidation = Joi.object({
  password: Joi.string().required().min(8),
  email: Joi.string().email().required().min(8),
});

export const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required().min(8),
});

export const updateUserValidation = Joi.object({
  full_name: Joi.string().min(3),
  email: Joi.string().email().min(8),
});

export const changePasswordValidation = Joi.object({
  password: Joi.string().required().min(8),
});
