import httpStatus from 'http-status';
import studentModel from '../models/student.js';
import studentMapper from '../mappers/student.mapper.js';
import ResponseError from '../utils/error/responseError.js';

const getStudentDetail = async (studentIdentificationNumber) => {
  const filter = { studentIdentificationNumber };
  const data = await studentModel.findOne(filter);

  if (!data) {
    throw new ResponseError('Data siswa tidak ditemukan', httpStatus.NOT_FOUND);
  }

  const student = studentMapper.getStudent(data);
  const parent = studentMapper.getParent(data);
  return { student, parent };
};

const getAllStudents = async (search) => {
  const filter = search ? { fullName: { $regex: search, $options: 'i' } } : {};
  const data = await studentModel.find(filter);
  return data.map(studentMapper.getStudent);
};

export default {
  getStudentDetail,
  getAllStudents,
};
