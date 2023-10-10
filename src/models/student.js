import mongoose from 'mongoose';
import userModel from './user.js';

const studentSchema = new mongoose.Schema({
  studentIdentificationNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{10}$/,
  },
});

export default userModel.discriminator('Student', studentSchema);
