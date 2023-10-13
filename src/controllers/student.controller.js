import studentService from '../services/student.service.js';
import validate from '../validations/validation.js';
import studentValidation from '../validations/student.validation.js';

const getStudentProfile = async (req, res) => {
  try {
    const { nomorInduk } = req.user;
    const data = await studentService.getStudentProfile(nomorInduk);
    res.json({ data });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

const getStudentDetail = async (req, res) => {
  try {
    const { nomorInduk } = req.params;
    const data = await studentService.getStudentProfile(nomorInduk);
    res.json({ data });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

const getAllStudent = async (req, res) => {
  try {
    const { search } = req.query;
    const data = await studentService.getAllStudent(search);
    res.json({ data });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

const updateStudentProfile = async (req, res) => {
  try {
    const { nomorInduk } = req.user;
    const student = validate(studentValidation.updateProfile, req.body);
    await studentService.updateStudentProfile(nomorInduk, student);
    res.json({
      pesan: 'Berhasil memperbarui data',
    });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

export default {
  getStudentProfile,
  updateStudentProfile,
  getStudentDetail,
  getAllStudent,
};
