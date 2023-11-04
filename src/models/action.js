import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
  student: {
    type: String,
    required: true,
  },
  actionType: {
    type: String,
    enum: [
      'Pemanggilan Orang Tua',
      'Surat Peringatan',
      'Pemanggilan oleh Bimbingan Konseling',
    ],
  },
  timestamps: { type: Date, default: Date.now() },
});

export default mongoose.model('Action', actionSchema);
