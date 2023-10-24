import reportModel from '../models/report.js';
import ResponseError from '../utils/error/response.error.js';
import reportMapper from '../mappers/report.mapper.js';
import { lookupAndUnwind } from '../utils/report/reportUtils.js';

const createNewReport = async (reporter, data) => {
  const { perpetrator } = data;
  if (reporter === perpetrator) {
    throw new ResponseError('Pelapor dan pelaku tidak boleh sama', 400);
  }
  await reportModel.create({ reporter, ...data });
};

const getAllReports = async () => {
  const reports = await reportModel.aggregate([
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
  ]);
  return reports.map(reportMapper.getReportDetail);
};

const getStudentReports = async (reporter) => {
  const reports = await reportModel.aggregate([
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
  ]);
  return reports.map(reportMapper.getStudentReports);
};

const getReportDetail = async (reportId) => {
  const report = await reportModel.aggregate([
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
  ]);
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
