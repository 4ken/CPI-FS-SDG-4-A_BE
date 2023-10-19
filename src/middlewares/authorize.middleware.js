import ResponseError from '../utils/error/response.error.js';

const authorize = (requiredRole) => (req, res, next) => {
  try {
    const { role } = req.user;
    if (requiredRole !== role) {
      throw new ResponseError('Akses ditolak', 403);
    }

    next();
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

export default authorize;
