import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  placeDateOfBirth: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  },
  role: {
    type: String,
    enum: ['teacher', 'student'],
    required: true,
  },
});

export default mongoose.model('User', userSchema);
