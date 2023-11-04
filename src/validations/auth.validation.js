import Joi from 'joi';

const login = Joi.object({
  identificationNumber: Joi.string().required().messages({
    'any.required': 'Nomor induk harus diisi',
    'string.empty': 'Nomor induk tidak boleh kosong',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Kata sandi harus diisi',
    'string.empty': 'Kata sandi tidak boleh kosong',
  }),
})
  .rename('nomorInduk', 'identificationNumber')
  .rename('kataSandi', 'password');

export default {
  login,
};
