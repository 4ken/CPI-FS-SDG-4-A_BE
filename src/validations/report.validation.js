import Joi from 'joi';

const create = Joi.object({
  perpetrator: Joi.string()
    .required()
    .pattern(/^\d{10}$/)
    .messages({
      'any.required': 'Nomor induk pelaku harus diisi',
      'string.pattern.base': 'Nomor induk pelaku harus berupa angka 10 digit',
      'string.empty': 'Nomor induk pelaku tidak boleh kosong',
    }),
  incidentDate: Joi.date().iso().required().messages({
    'any.required': 'Waktu kejadian harus diisi',
    'date.format': 'Format waktu kejadian tidak valid',
  }),
  incidentLocation: Joi.string().required().messages({
    'any.required': 'Lokasi kejadian harus diisi',
    'string.empty': 'Lokasi kejadian tidak boleh kosong',
  }),
  incidentDescription: Joi.string().required().messages({
    'any.required': 'Deskripsi kejadian harus diisi',
    'string.empty': 'Deskripsi kejadian tidak boleh kosong',
  }),
})
  .rename('nomorIndukPelaku', 'perpetrator')
  .rename('waktuKejadian', 'incidentDate')
  .rename('lokasiKejadian', 'incidentLocation')
  .rename('deskripsiKejadian', 'incidentDescription');

const statusEnum = [
  'belum diproses',
  'sedang diproses',
  'selesai',
  'dibatalkan',
];

const updateStatus = Joi.object({
  status: Joi.string()
    .valid(...statusEnum)
    .required()
    .messages({
      'any.only': `Status harus salah satu dari '${statusEnum.join("', '")}'`,
      'any.required': 'Status harus diisi',
      'string.empty': 'Status tidak boleh kosong',
    }),
});

export default {
  create,
  updateStatus,
};
