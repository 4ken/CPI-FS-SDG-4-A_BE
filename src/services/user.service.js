import teacherModel from '../models/teacher.js';
import studentModel from '../models/student.js';
import userMapper from '../mappers/user.mapper.js';
import passwordUtils from '../utils/auth/passwordUtils.js';
import ResponseError from '../utils/error/response.error.js';

const getUserModelAndFilter = (payload) => {
  const { identificationNumber, role } = payload;
  const userModel = role === 'teacher' ? teacherModel : studentModel;
  const idKey = role === 'teacher' ? 'employee' : 'student';
  const userFilter = { [`${idKey}IdentificationNumber`]: identificationNumber };
  return [userModel, userFilter];
};

const getProfile = async (payload) => {
  const [userModel, userFilter] = getUserModelAndFilter(payload);
  const user = await userModel.findOne(userFilter);
  return userMapper.fromModel(user);
};

const changePassword = async (payload, data) => {
  const [userModel, userFilter] = getUserModelAndFilter(payload);
  const user = await userModel.findOne(userFilter);
  const isPasswordValid = passwordUtils.verify(
    data.password,
    user.salt,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError('Kata sandi lama yang diberikan salah', 401);
  }
  const salt = passwordUtils.generateSalt();
  const password = passwordUtils.hash(data.newPassword, salt);
  await userModel.findOneAndUpdate(userFilter, { salt, password });
};

export default {
  getProfile,
  changePassword,
};
