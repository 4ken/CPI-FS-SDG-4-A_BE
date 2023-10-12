import mongoose from 'mongoose';
import userModel from './user.js';

const parentSchema = new mongoose.Schema({
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({
  studentIdentificationNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{10}$/,
  },
  parent: {
    type: parentSchema,
  },
});

export default userModel.discriminator('Student', studentSchema);
