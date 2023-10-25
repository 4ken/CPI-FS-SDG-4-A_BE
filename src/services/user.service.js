import httpStatus from 'http-status';
import getUserModelAndFilter from '../utils/user/getUserModelAndFilter.js';
import userMapper from '../mappers/user.mapper.js';
import passwordUtils from '../utils/auth/passwordUtils.js';
import ResponseError from '../utils/error/responseError.js';

const getProfile = async (payload) => {
  const [userModel, userFilter] = getUserModelAndFilter(payload);
  const user = await userModel.findOne(userFilter);
  return userMapper.getProfile(user);
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
    throw new ResponseError(
      'Kata sandi lama yang diberikan salah',
      httpStatus.UNAUTHORIZED
    );
  }

  const newPassword = passwordUtils.hash(
    data.newPassword,
    passwordUtils.generateSalt()
  );
  await userModel.findOneAndUpdate(userFilter, { password: newPassword });
};

export default {
  getProfile,
  changePassword,
};
