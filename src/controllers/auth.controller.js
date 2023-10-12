import authService from '../services/auth.service.js';
import validate from '../validations/validation.js';
import authValidation from '../validations/auth.validation.js';

const login = async (req, res) => {
  try {
    const data = validate(authValidation.login, req.body);
    const token = await authService.login(data);
    res.json({
      pesan: 'Login berhasil',
      token,
    });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { nomorInduk } = req.user;
    const data = validate(authValidation.resetPassword, req.body);
    await authService.resetPassword(nomorInduk, data);
    res.json({
      pesan: 'Kata sandi berhasil diubah',
    });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

export default {
  login,
  resetPassword,
};
