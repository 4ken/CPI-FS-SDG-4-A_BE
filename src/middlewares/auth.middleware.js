import jwt from 'jsonwebtoken';
import ResponseError from '../utils/error/response.error.js';

const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, payload) => {
      if (err) {
        const message = 'Token tidak valid';
        reject(new ResponseError(message, 403));
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
      throw new ResponseError(message, 401);
    }

    const token = authHeader.split(' ')[1];
    const payload = await verifyToken(token);

    req.user = payload;
    next();
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

export default authMiddleware;
