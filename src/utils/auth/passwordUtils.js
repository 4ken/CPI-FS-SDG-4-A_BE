import crypto from 'crypto';

function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

const hash = (password, salt) => {
  const iterations = 10000;
  const keylen = 65;
  const digest = 'sha256';
  const hashedPassword = crypto.pbkdf2Sync(
    password,
    salt,
    iterations,
    keylen,
    digest
  );
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
