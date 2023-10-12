import crypto from 'crypto';

function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

const hash = (password, salt) => {
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 65, 'sha256');
  return hashedPassword.toString('hex');
};

const verify = (password, salt, hashedPassword) => {
  const hashedPasswordToVerify = hash(password, salt);
  return hashedPasswordToVerify === hashedPassword;
};

export default {
  generateSalt,
  hash,
  verify,
};
