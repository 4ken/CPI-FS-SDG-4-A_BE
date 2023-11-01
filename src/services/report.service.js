import httpStatus from 'http-status';
import reportModel from '../models/report.js';
import ResponseError from '../utils/error/responseError.js';
import reportMapper from '../mappers/report.mapper.js';

const createNewReport = async (reporter, data) => {
  if (reporter === data.perpetrator) {
    throw new ResponseError(
      'Pelapor dan pelaku tidak boleh sama',
      httpStatus.BAD_REQUEST
    );
  }

  await reportModel.create({ reporter, ...data });
};

const getAllReports = async () => {
  const pipeline = [
    {
      $lookup: {
        from: 'users',
        localField: 'reporter',
        foreignField: 'studentIdentificationNumber',
        as: 'reporter',
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
  const reports = await reportModel.aggregate(pipeline);
  return reports.map(reportMapper.getReportDetail);
};

const getStudentReports = async (reporter) => {
  const pipeline = [
    {
      $lookup: {
        from: 'users',
        localField: 'perpetrator',
        foreignField: 'studentIdentificationNumber',
        as: 'perpetrator',
      },
    },
    {
      $unwind: '$perpetrator',
    },
    {
      $match: { reporter },
    },
    {
      $project: {
        perpetratorName: '$perpetrator.fullName',
        createdAt: 1,
        status: 1,
      },
    },
  ];
  const reports = await reportModel.aggregate(pipeline);
  return reports.map(reportMapper.getStudentReports);
};

const getReportDetail = async (reportId) => {
  const pipeline = [
    {
      $lookup: {
        from: 'users',
        localField: 'reporter',
        foreignField: 'studentIdentificationNumber',
        as: 'reporter',
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
      $match: { _id: reportId },
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
  const reports = await reportModel.aggregate(pipeline);
  return reportMapper.getReportDetail(reports[0]);
};

const updateReportStatus = async (reportId, data) => {
  await reportModel.findByIdAndUpdate(reportId, data);
};

export default {
  createNewReport,
  getAllReports,
  getStudentReports,
  getReportDetail,
  updateReportStatus,
};
