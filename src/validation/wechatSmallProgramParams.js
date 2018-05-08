import Joi from 'joi'

export let loginValidation = {
  body: {
    code: Joi.string().required(),
    encryptedData: Joi.string().required(),
    iv: Joi.string().required()
  }
}
