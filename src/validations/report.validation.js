import Joi from 'joi';
import studentModel from '../models/student.js';

const isValidPerpetrator = async (value) => {
  const filter = { studentIdentificationNumber: value };
  const student = await studentModel.findOne(filter);
  if (!student) {
    throw new Error(`Pelaku dengan nomor induk ${value} tidak ditemukan`);
  }
  return value;
};

const create = Joi.object({
  perpetrator: Joi.string()
    .required()
    .pattern(/^\d{10}$/)
    .external(isValidPerpetrator)
    .messages({
      'any.required': 'Nomor induk pelaku harus diisi',
      'string.pattern.base': 'Nomor induk pelaku harus berupa angka 10 digit',
    }),
  incidentDate: Joi.date().iso().required().messages({
    'any.required': 'Waktu kejadian harus diisi',
    'date.format': 'Format waktu kejadian tidak valid',
  }),
  incidentLocation: Joi.string().required().messages({
    'any.required': 'Lokasi kejadian harus diisi',
  }),
  incidentDescription: Joi.string().required().messages({
    'any.required': 'Deskripsi kejadian harus diisi',
  }),
})
  .rename('nomorIndukPelaku', 'perpetrator')
  .rename('waktuKejadian', 'incidentDate')
  .rename('lokasiKejadian', 'incidentLocation')
  .rename('deskripsiKejadian', 'incidentDescription');

const statusEnum = ['belum diproses', 'sedang diproses', 'selesai'];

const updateStatus = Joi.object({
  status: Joi.string()
    .valid(...statusEnum)
    .messages({
      'any.only': `Status harus salah satu dari "${statusEnum.join('", "')}"`,
    }),
});

export default {
  create,
  updateStatus,
};
