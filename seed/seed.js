import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import classModel from '../src/models/class.js';
import reportModel from '../src/models/report.js';
import userModel from '../src/models/user.js';
import studentModel from '../src/models/student.js';
import teacherModel from '../src/models/teacher.js';
import { createStudentData, createTeacherData } from './seedUtils.js';

const dbURI = 'put your MongoDB connection string here';

const { classes } = JSON.parse(readFileSync('./seed/data/classes.json'));
const { reports } = JSON.parse(readFileSync('./seed/data/reports.json'));
const { students } = JSON.parse(readFileSync('./seed/data/students.json'));
const { teachers } = JSON.parse(readFileSync('./seed/data/teachers.json'));

(async () => {
  try {
    await Promise.all([
      mongoose.connect(dbURI),
      classModel.deleteMany(),
      userModel.deleteMany(),
      reportModel.deleteMany(),
    ]);

    const classA = new classModel(classes[0]);
    const classB = new classModel(classes[1]);

    const studentsAData = createStudentData(classA, students.A);
    const studentsBData = createStudentData(classB, students.B);

    const teacherAData = createTeacherData(classA, teachers[0]);
    const teacherBData = createTeacherData(classB, teachers[1]);

    const classesData = [classA, classB];
    const studentsData = [...studentsAData, ...studentsBData];
    const teachersData = [teacherAData, teacherBData];

    await Promise.all([
      classModel.insertMany(classesData),
      studentModel.insertMany(studentsData),
      teacherModel.insertMany(teachersData),
      reportModel.insertMany(reports),
    ]);

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
