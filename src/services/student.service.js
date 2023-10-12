import studentModel from '../models/student.js';
import studentMapper from '../mappers/student.mapper.js';

const getStudentProfile = async (studentIdentificationNumber) => {
    const filter = { studentIdentificationNumber };
    const student = await studentModel.findOne(filter);
    return studentMapper.fromModel(student);
};

const updateStudentProfile = async (studentIdentificationNumber, data) => {
    const filter = { studentIdentificationNumber };
    const student = await studentModel.findOne(filter);
    const newStudentData = studentMapper.toModel({
        ...studentMapper.fromModel(student),
        ...data,
    });
    student.set(newStudentData);
    await student.save();
};

const getAllStudent = async (search) => {
    const filter = {};
    if (search) {
        filter.fullName = { $regex: search, $options: 'i' };
    }
    const students = await studentModel.find(filter);
    return students.map(studentMapper.fromModel);
};

export default {
    getStudentProfile,
    updateStudentProfile,
    getAllStudent,
};
