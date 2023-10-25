import reportService from '../services/report.service.js';
import validate, { validateAsync } from '../validations/validation.js';
import reportValidation from '../validations/report.validation.js';
import { validationReportId } from '../utils/report/reportUtils.js';
import handleErrorResponse from '../utils/response/handleErrorResponse.js';

const getAllReports = async (req, res) => {
  try {
    const data = await reportService.getAllReports();
    res.json({ data });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getReportDetail = async (req, res) => {
  try {
    const reportId = await validationReportId(req.params);
    const data = await reportService.getReportDetail(reportId);
    res.json({ data });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getStudentReports = async (req, res) => {
  try {
    const { identificationNumber } = req.user;
    const data = await reportService.getStudentReports(identificationNumber);
    res.json({ data });
  } catch (error) {
    handleErrorResponse(res, error);
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
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const data = validate(reportValidation.updateStatus, req.body);
    const reportId = await validationReportId(req.params);
    await reportService.updateReportStatus(reportId, data);
    res.json({
      pesan: 'Berhasil memperbarui status laporan',
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export default {
  getAllReports,
  getReportDetail,
  getStudentReports,
  createNewReport,
  updateReportStatus,
};
