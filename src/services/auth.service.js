import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
import ResponseError from '../utils/error/response.error.js';

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
  const isPasswordValid = await bcrypt.compare(data.kataSandi, user.password);
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

const resetPassword = async (data) => {
  const userFilter = {
    $or: [
      { employeeIdentificationNumber: data.nomorInduk },
      { studentIdentificationNumber: data.nomorInduk },
    ],
  };
  const user = await userModel.findOne(userFilter);
  const isPasswordValid = await bcrypt.compare(
    data.kataSandiLama,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError('Kata sandi lama yang diberikan salah', 401);
  }
  const password = await bcrypt.hash(data.kataSandiBaru, 10);
  await userModel.findOneAndUpdate(userFilter, { password });
};

export default {
  login,
  resetPassword,
};
