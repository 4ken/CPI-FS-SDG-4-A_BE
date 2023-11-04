import Joi from 'joi';

const changePassword = Joi.object({
  password: Joi.string().required().messages({
    'any.required': 'Kata sandi lama harus diisi',
    'string.empty': 'Kata sandi lama tidak boleh kosong',
  }),
  newPassword: Joi.string().required().messages({
    'any.required': 'Kata sandi baru harus diisi',
    'string.empty': 'Kata sandi baru tidak boleh kosong',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.required': 'Konfirmasi kata sandi harus diisi',
      'any.only': 'Konfirmasi kata sandi tidak cocok dengan kata sandi baru',
      'string.empty': 'Konfirmasi kata sandi tidak boleh kosong',
    }),
})
  .rename('kataSandiLama', 'password')
  .rename('kataSandiBaru', 'newPassword')
  .rename('konfirmasiKataSandi', 'confirmPassword');

export default {
  changePassword,
};
