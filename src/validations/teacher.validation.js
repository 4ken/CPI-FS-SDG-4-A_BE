import Joi from 'joi';

const updateProfile = Joi.object({
  nomorInduk: Joi.string()
    .pattern(/^\d{18}$/)
    .required()
    .messages({
      'any.required': 'Nomor induk harus diisi',
      'string.pattern.base': 'Nomor induk harus terdiri dari 18 digit angka',
    }),
  nama: Joi.string().required().messages({
    'any.required': 'Nama harus diisi',
  }),
  tempatTanggalLahir: Joi.string().required().messages({
    'any.required': 'Tempat dan tanggal lahir harus diisi',
  }),
  alamat: Joi.string().required().messages({
    'any.required': 'Alamat harus diisi',
  }),
});

export default {
  updateProfile,
};
