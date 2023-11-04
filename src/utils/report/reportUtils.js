import { isValidObjectId, Types } from 'mongoose';
import httpStatus from 'http-status';
import ResponseError from '../error/responseError.js';

export const getObjectId = async ({ reportId }) => {
  if (!isValidObjectId(reportId)) {
    throw new ResponseError('ID Laporan tidak valid', httpStatus.BAD_REQUEST);
  }
  return new Types.ObjectId(reportId);
};

export const getReportsPipeline = (userClass, reportId) => {
  const pipeline = [
    {
      $lookup: {
        from: 'users',
        localField: 'reporter',
        foreignField: 'studentIdentificationNumber',
        as: 'reporter',
        pipeline: [
          {
            $match: { class: new Types.ObjectId(userClass) },
          },
        ],
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'perpetrator',
        foreignField: 'studentIdentificationNumber',
        as: 'perpetrator',
      },
    },
    {
      $unwind: '$reporter',
    },
    {
      $unwind: '$perpetrator',
    },
    {
      $project: {
        reporterName: '$reporter.fullName',
        perpetratorName: '$perpetrator.fullName',
        incidentDate: 1,
        createdAt: 1,
        incidentLocation: 1,
        incidentDescription: 1,
        status: 1,
      },
    },
  ];

  if (reportId) {
    pipeline.push({
      $match: { _id: reportId },
    });
  }

  return pipeline;
};
