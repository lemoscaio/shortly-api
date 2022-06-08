import Joi from "joi"

export const newUserSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-ZãÃÇ-Üá-ú ]*$/i)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^\S{6,20}$/)
    .required(),
  confirmPassword: Joi.string()
    .pattern(/^\S{6,20}$/)
    .required(),
})
