import teacherModel from '../models/teacher.js';
import teacherMapper from '../mappers/teacher.mapper.js';

const getTeacherProfile = async (employeeIdentificationNumber) => {
  const filter = { employeeIdentificationNumber };
  const teacher = await teacherModel.findOne(filter);
  return teacherMapper.fromModel(teacher);
};

const updateTeacherProfile = async (employeeIdentificationNumber, data) => {
  const filter = { employeeIdentificationNumber };
  const newTeacherData = teacherMapper.toModel(data);
  await teacherModel.findOneAndUpdate(filter, newTeacherData);
};

export default {
  getTeacherProfile,
  updateTeacherProfile,
};
