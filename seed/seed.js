import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import userModel from '../src/models/user.js';
import studentModel from '../src/models/student.js';
import teacherModel from '../src/models/teacher.js';
import passwordUtils from '../src/utils/auth/passwordUtils.js';

const dbURI = 'mongodb://0.0.0.0:27017/Anty-bullying';
const data = JSON.parse(readFileSync('./seed/data.json'));

(async () => {
  try {
    await mongoose.connect(dbURI);
    await userModel.deleteMany({});

    const teacherSalt = passwordUtils.generateSalt();
    const teacher = {
      ...data.teacher,
      role: 'teacher',
      salt: teacherSalt,
      password: passwordUtils.hash(
        data.teacher.employeeIdentificationNumber,
        teacherSalt
      ),
    };

    const students = data.students.map((student) => {
      const studentSalt = passwordUtils.generateSalt();
      return {
        ...student,
        role: 'student',
        salt: studentSalt,
        password: passwordUtils.hash(
          student.studentIdentificationNumber,
          studentSalt
        ),
      };
    });

    await teacherModel.create(teacher);
    await studentModel.insertMany(students);

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
