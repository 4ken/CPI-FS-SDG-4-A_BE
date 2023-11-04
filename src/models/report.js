import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    perpetrator: {
      type: String,
      required: true,
    },
    reporter: {
      type: String,
      required: true,
    },
    incidentDate: {
      type: Date,
      required: true,
    },
    incidentLocation: {
      type: String,
      required: true,
    },
    incidentDescription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['belum diproses', 'sedang diproses', 'selesai', 'dibatalkan'],
      default: 'belum diproses',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Report', reportSchema);
