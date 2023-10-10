import mongoose from 'mongoose';
import userModel from './user.js';

const teacherSchema = new mongoose.Schema({
  employeeIdentificationNumber: {
    type: String,
    required: true,
    match: /^\d{18}$/,
  },
});

export default userModel.discriminator('Teacher', teacherSchema);
