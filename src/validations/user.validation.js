import Joi from 'joi';

const changePassword = Joi.object({
  password: Joi.string().required().messages({
    'any.required': 'Kata sandi lama harus diisi',
  }),
  newPassword: Joi.string().required().messages({
    'any.required': 'Kata sandi baru harus diisi',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.required': 'Konfirmasi kata sandi harus diisi',
      'any.only': 'Konfirmasi kata sandi tidak cocok dengan kata sandi baru',
    }),
})
  .rename('kataSandiLama', 'password')
  .rename('kataSandiBaru', 'newPassword')
  .rename('konfirmasiKataSandi', 'confirmPassword');

export default {
  changePassword,
};
