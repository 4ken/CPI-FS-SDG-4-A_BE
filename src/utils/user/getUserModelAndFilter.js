import teacherModel from '../../models/teacher.js';
import studentModel from '../../models/student.js';

const getUserModelAndFilter = (payload) => {
  const { identificationNumber, role } = payload;
  const userModel = role === 'teacher' ? teacherModel : studentModel;
  const idKey = role === 'teacher' ? 'employee' : 'student';
  const userFilter = { [`${idKey}IdentificationNumber`]: identificationNumber };
  return [userModel, userFilter];
};

export default getUserModelAndFilter;
