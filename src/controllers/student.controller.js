import studentService from '../services/student.service.js';
import handleErrorResponse from '../utils/response/handleErrorResponse.js';

const getStudentDetail = async (req, res) => {
  try {
    const { identificationNumber } = req.params;
    const data = await studentService.getStudentDetail(identificationNumber);
    const { student: siswa, parent: orangTua } = data;
    res.json({ data: { siswa, orangTua } });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getAllStudents = async (req, res) => {
  try {
    const { role } = req.user;
    const { search } = req.query;
    const data = await studentService.getAllStudents(role, search);
    res.json({ data });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export default {
  getAllStudents,
  getStudentDetail,
};
