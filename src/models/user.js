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
  role: {
    type: String,
    enum: ['guru', 'siswa'],
    required: true,
  },
});

export default mongoose.model('User', userSchema);
