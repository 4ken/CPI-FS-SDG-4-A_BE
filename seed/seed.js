import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import userModel from '../src/models/user.js';
import studentModel from '../src/models/student.js';
import teacherModel from '../src/models/teacher.js';
import reportModel from '../src/models/report.js';
import passwordUtils from '../src/utils/auth/passwordUtils.js';

const generateSaltAndHash = (identificationNumber) => {
  const salt = passwordUtils.generateSalt();
  const password = passwordUtils.hash(identificationNumber, salt);
  return { salt, password };
};

(async () => {
  const dbURI = 'mongodb://127.0.0.1:27017/test_antybullying';
  const data = JSON.parse(readFileSync('./seed/data.json'));

  try {
    await mongoose.connect(dbURI);

    await userModel.deleteMany();
    await reportModel.deleteMany();

    const { employeeIdentificationNumber } = data.teacher;
    const teacher = {
      ...data.teacher,
      ...generateSaltAndHash(employeeIdentificationNumber),
    };

    const students = data.students.map((student) => {
      const { studentIdentificationNumber } = student;
      return {
        ...student,
        ...generateSaltAndHash(studentIdentificationNumber),
      };
    });

    await teacherModel.create(teacher);
    await studentModel.insertMany(students);
    await reportModel.insertMany(data.reports);

    console.log('Successfully seeding data');
    process.exitCode = 0;
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit(process.exitCode);
  }
})();
