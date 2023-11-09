import httpStatus from 'http-status';
import actionModel from '../models/action.js';
import studentModel from '../models/student.js';
import getActionData from '../utils/action/getActionData.js';
import actionMapper from '../mappers/action.mapper.js';
import ResponseError from '../utils/error/responseError.js';

const getAllActionHistory = async (identificationNumber) => {
  const actionTypes = [
    'pemanggilan orang tua',
    'surat peringatan',
    'pemanggilan oleh bimbingan konseling',
  ];

  const allActionHistory = await Promise.all(
    actionTypes.map((action) => getActionData(action, identificationNumber))
  );

  const flattenedHistory = allActionHistory.flat();

  if (!flattenedHistory.length) {
    return [];
  }

  return flattenedHistory.map(actionMapper.getAllActionHistory);
};

const createNewAction = async (studentIdentificationNumber, data) => {
  const student = await studentModel.findOne({ studentIdentificationNumber });

  if (!student) {
    throw new ResponseError('Siswa tidak ditemukan', httpStatus.NOT_FOUND);
  }

  await actionModel.create({
    student: studentIdentificationNumber,
    actionType: data.actionType,
  });
};

export default {
  getAllActionHistory,
  createNewAction,
};
