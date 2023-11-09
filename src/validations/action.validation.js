import Joi from 'joi';

const actionEnum = [
  'pemanggilan orang tua',
  'surat peringatan',
  'pemanggilan oleh bimbingan konseling',
];

const create = Joi.object({
  actionType: Joi.string()
    .valid(...actionEnum)
    .required()
    .messages({
      'any.only': `Tindakan harus salah satu dari '${actionEnum.join("', '")}'`,
      'any.required': 'Tindakan harus diisi',
      'string.empty': 'Tindakan tidak boleh kosong',
    }),
}).rename('tindakan', 'actionType');

export default {
  create,
};
