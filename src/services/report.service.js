import httpStatus from 'http-status';
import reportModel from '../models/report.js';
import ResponseError from '../utils/error/responseError.js';
import reportMapper from '../mappers/report.mapper.js';
import { lookupAndUnwind } from '../utils/report/reportUtils.js';

const createNewReport = async (reporter, data) => {
  const { perpetrator } = data;

  if (reporter === perpetrator) {
    throw new ResponseError(
      'Pelapor dan pelaku tidak boleh sama',
      httpStatus.BAD_REQUEST
    );
  }

  await reportModel.create({ reporter, ...data });
};

const getAllReports = async () => {
  const pipeline = [
    ...lookupAndUnwind('reporter', 'studentIdentificationNumber'),
    ...lookupAndUnwind('perpetrator', 'studentIdentificationNumber'),
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
    ...lookupAndUnwind('perpetrator', 'studentIdentificationNumber'),
    {
      $match: {
        reporter,
      },
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
    ...lookupAndUnwind('reporter', 'studentIdentificationNumber'),
    ...lookupAndUnwind('perpetrator', 'studentIdentificationNumber'),
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
  const report = await reportModel.aggregate(pipeline);
  return reportMapper.getReportDetail(report[0]);
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
