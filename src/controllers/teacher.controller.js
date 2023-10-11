import teacherService from '../services/teacher.service.js';
import validate from '../validations/validation.js';
import teacherValidation from '../validations/teacher.validation.js';

const getTeacherProfile = async (req, res) => {
  try {
    const { nomorInduk } = req.user;
    const data = await teacherService.getTeacherProfile(nomorInduk);
    res.json({ data });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

const updateTeacherProfile = async (req, res) => {
  try {
    const { nomorInduk } = req.user;
    const teacher = validate(teacherValidation.updateProfile, req.body);
    await teacherService.updateTeacherProfile(nomorInduk, teacher);
    res.json({
      pesan: 'Berhasil memperbarui data',
    });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

export default {
  getTeacherProfile,
  updateTeacherProfile,
};
