import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import ResponseError from '../utils/error/responseError.js';
import handleErrorResponse from '../utils/response/handleErrorResponse.js';

const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('JWT_SECRET environment variable is missing');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, payload) => {
      if (err) {
        const message = 'Token tidak valid';
        reject(new ResponseError(message, httpStatus.FORBIDDEN));
      }
      resolve(payload);
    });
  });
};

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      const message = 'Anda tidak memiliki akses ke sumber daya ini';
      throw new ResponseError(message, httpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    const payload = await verifyToken(token);

    req.user = payload;
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export default authMiddleware;
