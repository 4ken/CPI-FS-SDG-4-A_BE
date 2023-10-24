import studentService from '../services/student.service.js';

const getStudentDetail = async (req, res) => {
  try {
    const { identificationNumber } = req.params;
    const data = await studentService.getStudentDetail(identificationNumber);
    const { student: siswa, parent: orangTua } = data;
    res.json({ data: { siswa, orangTua } });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const { search } = req.query;
    const data = await studentService.getAllStudents(search);
    res.json({ data });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

export default {
  getAllStudents,
  getStudentDetail,
};
