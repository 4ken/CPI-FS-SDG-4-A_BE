import httpStatus from 'http-status';
import ResponseError from '../utils/error/responseError.js';
import handleErrorResponse from '../utils/response/handleErrorResponse.js';

const authorize = (requiredRole) => (req, res, next) => {
  try {
    const { role } = req.user;
    if (requiredRole !== role) {
      throw new ResponseError('Akses ditolak', httpStatus.FORBIDDEN);
    }
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export default authorize;
