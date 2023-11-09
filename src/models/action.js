import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema(
  {
    student: {
      type: String,
      required: true,
    },
    actionType: {
      type: String,
      enum: [
        'pemanggilan orang tua',
        'surat peringatan',
        'pemanggilan oleh bimbingan konseling',
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Action', actionSchema);
