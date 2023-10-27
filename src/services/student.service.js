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
  const parent = studentMapper.getParent(data.parent);
  return { student, parent };
};

const getAllStudents = async (role, search) => {
  const filter = search ? { fullName: { $regex: search, $options: 'i' } } : {};
  const isTeacher = role === 'teacher';
  const projection = !isTeacher
    ? { studentIdentificationNumber: 1, fullName: 1 }
    : {};
  const data = await studentModel.find(filter, projection);
  return data.map(studentMapper.getStudent);
};

export default {
  getStudentDetail,
  getAllStudents,
};
