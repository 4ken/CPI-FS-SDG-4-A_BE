import { isValidObjectId, Types } from 'mongoose';
import reportModel from '../../models/report.js';
import ResponseError from '../error/responseError.js';

export const lookupAndUnwind = (localField, foreignField) => [
  {
    $lookup: {
      from: 'users',
      localField,
      foreignField,
      as: localField,
    },
  },
  {
    $unwind: `$${localField}`,
  },
];

export const validationReportId = async ({ reportId }) => {
  if (!isValidObjectId(reportId)) {
    throw new ResponseError('ID Laporan tidak valid', 400);
  }
  const report = await reportModel.findById(reportId);
  if (!report) {
    throw new ResponseError('Laporan tidak ditemukan', 404);
  }
  return new Types.ObjectId(reportId);
};
