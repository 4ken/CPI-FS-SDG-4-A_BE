import httpStatus from 'http-status';
import studentModel from '../models/student.js';
import studentMapper from '../mappers/student.mapper.js';
import ResponseError from '../utils/error/responseError.js';

const getStudentDetail = async (userClass, studentIdentificationNumber) => {
  const filter = { class: userClass, studentIdentificationNumber };
  const data = await studentModel.findOne(filter);

  if (!data) {
    throw new ResponseError('Data siswa tidak ditemukan', httpStatus.NOT_FOUND);
  }

  const student = studentMapper.getStudent(data);
  const parent = studentMapper.getParent(data.parent);
  return { student, parent };
};

const getAllStudents = async (payload, search) => {
  const { class: userClass, role, identificationNumber } = payload;

  const filter = { class: userClass };
  let projection = {};

  if (search) {
    filter.fullName = { $regex: search, $options: 'i' };
  }

  if (role !== 'teacher') {
    filter.studentIdentificationNumber = { $ne: identificationNumber };
    projection = { studentIdentificationNumber: 1, fullName: 1 };
  }

  const data = await studentModel.find(filter, projection);
  return data.map(studentMapper.getStudent);
};

export default {
  getStudentDetail,
  getAllStudents,
};
