import userService from '../services/user.service.js';
import validate from '../validations/validation.js';
import userValidation from '../validations/user.validation.js';

const getProfile = async (req, res) => {
  try {
    const data = await userService.getProfile(req.user);
    res.json({ data });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

const changePassword = async (req, res) => {
  try {
    const data = validate(userValidation.changePassword, req.body);
    await userService.changePassword(req.user, data);
    res.json({
      pesan: 'Kata sandi berhasil diubah',
    });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

export default {
  getProfile,
  changePassword,
};
