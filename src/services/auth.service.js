import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
import ResponseError from '../utils/error/response.error.js';
import passwordUtils from '../utils/auth/passwordUtils.js';

const login = async (data) => {
  const user = await userModel.findOne({
    $or: [
      { employeeIdentificationNumber: data.identificationNumber },
      { studentIdentificationNumber: data.identificationNumber },
    ],
  });
  if (!user || !passwordUtils.verify(data.password, user.salt, user.password)) {
    throw new ResponseError('Nomor induk atau kata sandi salah', 401);
  }
  const payload = {
    identificationNumber: data.identificationNumber,
    role: user.role,
  };
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secretKey, options);
  return { role: user.role, token };
};

export default {
  login,
};
