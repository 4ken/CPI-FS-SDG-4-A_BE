import Joi from 'joi';

const login = Joi.object({
  identificationNumber: Joi.string().required().messages({
    'any.required': 'Nomor induk harus diisi',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Kata sandi harus diisi',
  }),
})
  .rename('nomorInduk', 'identificationNumber')
  .rename('kataSandi', 'password');

export default {
  login,
};
