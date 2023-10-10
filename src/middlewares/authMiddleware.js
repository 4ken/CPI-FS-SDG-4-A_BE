import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const error = 'Anda tidak memiliki akses ke sumber daya ini';
  if (!authHeader) {
    res.status(401).json({ error });
  } else {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        res.status(401).json({ error });
      } else {
        const userFilter = {
          $or: [
            { employeeIdentificationNumber: decoded.nomorInduk },
            { studentIdentificationNumber: decoded.nomorInduk },
          ],
        };
        const user = await userModel.findOne(userFilter);
        if (!user) {
          res.status(401).json({ error });
        } else {
          req.user = decoded;
          next();
        }
      }
    });
  }
};

export default authMiddleware;
