import Joi from "joi";
export const createEmployeeBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  salary: Joi.number().required(),
  department: Joi.string().required(),
});

export const updateEmployeeBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  salary: Joi.number().required(),
  department: Joi.string().required(),
});