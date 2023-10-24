import reportService from '../services/report.service.js';
import validate, { validateAsync } from '../validations/validation.js';
import reportValidation from '../validations/report.validation.js';
import { validationReportId } from '../utils/report/reportUtils.js';

const getAllReports = async (req, res) => {
  try {
    const data = await reportService.getAllReports();
    res.json({ data });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

const getReportDetail = async (req, res) => {
  try {
    const reportId = await validationReportId(req.params);
    const data = await reportService.getReportDetail(reportId);
    res.json({ data });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

const getStudentReports = async (req, res) => {
  try {
    const { identificationNumber } = req.user;
    const data = await reportService.getStudentReports(identificationNumber);
    res.json({ data });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

const createNewReport = async (req, res) => {
  try {
    const { identificationNumber } = req.user;
    const data = await validateAsync(reportValidation.create, req.body);
    await reportService.createNewReport(identificationNumber, data);
    res.json({
      pesan: 'Berhasil membuat laporan',
    });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const reportId = await validationReportId(req.params);
    const data = validate(reportValidation.updateStatus, req.body);
    await reportService.updateReportStatus(reportId, data);
    res.json({
      pesan: 'Berhasil memperbarui status laporan',
    });
  } catch ({ message: error, status = 500 }) {
    res.status(status).json({ error });
  }
};

export default {
  getAllReports,
  getReportDetail,
  getStudentReports,
  createNewReport,
  updateReportStatus,
};
