import Joi from 'joi';

const updateProfile = Joi.object({
  nomorInduk: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'any.required': 'Nomor induk harus diisi',
      'string.pattern.base': 'Nomor induk harus terdiri dari 10 digit angka',
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
  orangTua: Joi.object({
    namaAyah: Joi.string().required().messages({
      'any.required': 'Nama ayah harus diisi',
    }),
    namaIbu: Joi.string().required().messages({
      'any.required': 'Nama ibu harus diisi',
    }),
  }),
});

export default {
  updateProfile,
};
