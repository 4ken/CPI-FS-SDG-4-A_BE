import studentModel from '../models/student.js';
import studentMapper from '../mappers/student.mapper.js';
import parrentMapper from '../mappers/parent.mapper.js';
import ResponseError from '../utils/error/response.error.js';

const getStudentDetail = async (studentIdentificationNumber) => {
  const filter = { studentIdentificationNumber };
  const data = await studentModel.findOne(filter);
  if (!data) {
    throw new ResponseError('Data siswa tidak ditemukan', 404);
  }
  const student = studentMapper.fromModel(data);
  const parent = parrentMapper.fromModel(data);
  return { student, parent };
};

const getAllStudents = async (search) => {
  const filter = {};
  if (search) {
    filter.fullName = { $regex: search, $options: 'i' };
  }
  const data = await studentModel.find(filter);
  return data.map(studentMapper.fromModel);
};

export default {
  getStudentDetail,
  getAllStudents,
};
