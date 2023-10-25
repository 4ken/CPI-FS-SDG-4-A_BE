import userService from '../services/user.service.js';
import validate from '../validations/validation.js';
import userValidation from '../validations/user.validation.js';
import handleErrorResponse from '../utils/response/handleErrorResponse.js';

const getProfile = async (req, res) => {
  try {
    const data = await userService.getProfile(req.user);
    res.json({ data });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const changePassword = async (req, res) => {
  try {
    const data = validate(userValidation.changePassword, req.body);
    await userService.changePassword(req.user, data);
    res.json({
      pesan: 'Kata sandi berhasil diubah',
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export default {
  getProfile,
  changePassword,
};
