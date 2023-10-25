import httpStatus from 'http-status';
import ResponseError from '../utils/error/responseError.js';
import passwordUtils from '../utils/auth/passwordUtils.js';
import findUser from '../utils/auth/findUser.js';
import createToken from '../utils/auth/createToken.js';

const login = async (data) => {
  const user = await findUser(data.identificationNumber);

  if (!user || !passwordUtils.verify(data.password, user.salt, user.password)) {
    throw new ResponseError(
      'Nomor induk atau kata sandi salah',
      httpStatus.UNAUTHORIZED
    );
  }

  const payload = {
    identificationNumber: data.identificationNumber,
    role: user.role,
  };

  const token = createToken(payload);
  return { role: user.role, token };
};

export default {
  login,
};
