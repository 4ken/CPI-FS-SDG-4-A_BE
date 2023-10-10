import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import userModel from '../src/models/user.js';
import studentModel from '../src/models/student.js';
import teacherModel from '../src/models/teacher.js';

const dbHost = 'put your MongoDB connection string here';
const data = JSON.parse(readFileSync('./seed/data.json'));

(async () => {
  try {
    await mongoose.connect(dbHost);
    await userModel.deleteMany({});

    const teacher = await teacherModel.create({
      ...data.teacher,
      role: 'guru',
      password: await bcrypt.hash(
        data.teacher.employeeIdentificationNumber,
        10
      ),
    });

    const students = await Promise.all(
      data.students.map(async (student) => ({
        ...student,
        role: 'siswa',
        password: await bcrypt.hash(student.studentIdentificationNumber, 10),
      }))
    );

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
