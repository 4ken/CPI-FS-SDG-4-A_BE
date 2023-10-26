import { Mongoose } from 'mongoose';

const actionSchema = new Mongoose.Schema({
  student: {
    type: String,
    required: true,
  },
  currentDisciplinaryAction: {
    type: String,
    enum: [
      'belum ada tindakan',
      'pemanggilan orang tua',
      'pemanggilan oleh bimbingan konseling',
      'surat peringatan 1',
      'surat peringatan 2',
    ],
    default: 'belum ada tindakan',
    required: true,
    timestamps: true,
  },
  disciplinaryActionHistory: [
    {
      action: {
        type: String,
        enum: [
          'belum ada tindakan',
          'pemanggilan orang tua',
          'pemanggilan oleh bimbingan konseling',
          'surat peringatan 1',
          'surat peringatan 2',
        ],
        required: true,
      },
      timestamps: true,
    },
  ],
});

export default Mongoose.model('Action', actionSchema);
