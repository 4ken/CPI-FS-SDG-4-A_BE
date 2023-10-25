import jwt from 'jsonwebtoken';

const createToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('JWT_SECRET environment variable is missing');
  }
  const tokenDuration = process.env.JWT_EXPIRATION || '2h';
  const options = { expiresIn: tokenDuration };
  return jwt.sign(payload, secretKey, options);
};

export default createToken;
