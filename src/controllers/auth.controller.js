import authService from '../services/auth.service.js';
import validate from '../validations/validation.js';
import authValidation from '../validations/auth.validation.js';

const login = async (req, res) => {
  try {
    const data = validate(authValidation.login, req.body);
    const { role, token } = await authService.login(data);
    const isTeacher = role === 'teacher';
    res.json({
      pesan: `Berhasil masuk sebagai ${isTeacher ? 'guru' : 'siswa'}`,
      token,
    });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

export default {
  login,
};
