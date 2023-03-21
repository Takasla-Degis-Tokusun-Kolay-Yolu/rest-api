import Joi from 'joi';

export const createValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  rePassword: Joi.string().required().valid(Joi.ref('password')),
  profileImage: Joi.string(),
  location: Joi.string().required(),
  isAdmin: Joi.boolean(),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required().min(8),
  password: Joi.string().required().min(8),
});

export const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required().min(8),
});

export const updateUserValidation = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  profileImage: Joi.string(),
  location: Joi.string(),
});

export const changePasswordValidation = Joi.object({
  oldPassword: Joi.string().required().min(8),
  newPassword: Joi.string().required().min(8),
  rePassword: Joi.string().required().valid(Joi.ref('newPassword')),
});
