import httpStatus from 'http-status';
import reportModel from '../models/report.js';
import studentModel from '../models/student.js';
import ResponseError from '../utils/error/responseError.js';
import reportMapper from '../mappers/report.mapper.js';
import { getReportsPipeline } from '../utils/report/reportUtils.js';

const createNewReport = async (payload, data) => {
  const filter = { studentIdentificationNumber: data.perpetrator };
  const student = await studentModel.findOne(filter);

  const isSameClass = student.class.toString() === payload.class;
  if (!student || !isSameClass) {
    throw new ResponseError(
      `Pelaku dengan nomor induk ${data.perpetrator} tidak ditemukan`,
      httpStatus.NOT_FOUND
    );
  }

  if (payload.identificationNumber === data.perpetrator) {
    throw new ResponseError(
      'Pelapor dan pelaku tidak boleh sama',
      httpStatus.BAD_REQUEST
    );
  }

  await reportModel.create({
    reporter: payload.identificationNumber,
    ...data,
  });
};

const getAllReports = async (userClass) => {
  const pipeline = getReportsPipeline(userClass);
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

const getReportDetail = async (userClass, reportId) => {
  const pipeline = getReportsPipeline(userClass, reportId);
  const reports = await reportModel.aggregate(pipeline);
  if (!reports[0]) {
    throw new ResponseError('Laporan tidak ditemukan', httpStatus.NOT_FOUND);
  }
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
