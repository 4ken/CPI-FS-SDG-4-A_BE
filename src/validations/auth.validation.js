import Joi from 'joi';

const login = Joi.object({
  nomorInduk: Joi.string().required().messages({
    'any.required': 'Nomor induk harus diisi',
  }),
  kataSandi: Joi.string().required().messages({
    'any.required': 'Kata sandi harus diisi',
  }),
});

const resetPassword = Joi.object({
  kataSandiLama: Joi.string().required().messages({
    'any.required': 'Kata sandi lama harus diisi',
  }),
  kataSandiBaru: Joi.string().required().messages({
    'any.required': 'Kata sandi baru harus diisi',
  }),
  konfirmasiKataSandi: Joi.string()
    .valid(Joi.ref('kataSandiBaru'))
    .required()
    .messages({
      'any.required': 'Konfirmasi kata sandi harus diisi',
      'any.only': 'Konfirmasi kata sandi tidak cocok dengan kata sandi baru',
    }),
});

export default {
  login,
  resetPassword,
};
