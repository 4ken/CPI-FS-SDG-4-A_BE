import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
import ResponseError from '../utils/error/response.error.js';
import passwordUtils from '../utils/auth/passwordUtils.js';

const login = async (data) => {
  const userFilter = {
    $or: [
      { employeeIdentificationNumber: data.nomorInduk },
      { studentIdentificationNumber: data.nomorInduk },
    ],
  };
  const user = await userModel.findOne(userFilter);
  const message = 'Nomor induk atau kata sandi salah';
  if (!user) {
    throw new ResponseError(message, 401);
  }
  const isPasswordValid = passwordUtils.verify(
    data.kataSandi,
    user.salt,
    user.password,
  );
  if (!isPasswordValid) {
    throw new ResponseError(message, 401);
  }
  const payload = {
    nomorInduk: data.nomorInduk,
    peran: user.role,
  };
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

const resetPassword = async (identificationNumber, data) => {
  const userFilter = {
    $or: [
      { employeeIdentificationNumber: identificationNumber },
      { studentIdentificationNumber: identificationNumber },
    ],
  };
  const user = await userModel.findOne(userFilter);
  const isPasswordValid = passwordUtils.verify(
    data.kataSandiLama,
    user.salt,
    user.password,
  );
  if (!isPasswordValid) {
    throw new ResponseError('Kata sandi lama yang diberikan salah', 401);
  }
  const salt = passwordUtils.generateSalt();
  const password = passwordUtils.hash(data.kataSandiBaru, salt);
  await userModel.findOneAndUpdate(userFilter, { salt, password });
};

export default {
  login,
  resetPassword,
};
