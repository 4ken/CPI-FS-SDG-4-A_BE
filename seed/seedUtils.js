import passwordUtils from '../src/utils/auth/passwordUtils.js';

const generateSaltAndHash = (identificationNumber) => {
  const salt = passwordUtils.generateSalt();
  const password = passwordUtils.hash(identificationNumber, salt);
  return { salt, password };
};

export const createStudentData = (classInstance, students) => {
  return students.map((student) => {
    const { studentIdentificationNumber, ...restStudentData } = student;
    return {
      class: classInstance._id,
      studentIdentificationNumber,
      ...restStudentData,
      ...generateSaltAndHash(studentIdentificationNumber),
    };
  });
};

export const createTeacherData = (classInstance, teacher) => {
  const { employeeIdentificationNumber, ...restTeacherData } = teacher;
  return {
    class: classInstance._id,
    employeeIdentificationNumber,
    ...restTeacherData,
    ...generateSaltAndHash(employeeIdentificationNumber),
  };
};
