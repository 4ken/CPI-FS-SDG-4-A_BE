import reportService from '../services/report.service.js';
import validate from '../validations/validation.js';
import reportValidation from '../validations/report.validation.js';
import { getObjectId } from '../utils/report/reportUtils.js';
import handleErrorResponse from '../utils/response/handleErrorResponse.js';

const createNewReport = async (req, res) => {
  try {
    const data = await validate(reportValidation.create, req.body);
    await reportService.createNewReport(req.user, data);
    res.json({
      pesan: 'Berhasil membuat laporan',
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getAllReports = async (req, res) => {
  try {
    const { class: userClass } = req.user;
    const data = await reportService.getAllReports(userClass);
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

const getReportDetail = async (req, res) => {
  try {
    const { class: userClass } = req.user;
    const reportId = await getObjectId(req.params);
    const data = await reportService.getReportDetail(userClass, reportId);
    res.json({ data });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const { class: userClass } = req.user;
    const reportId = await getObjectId(req.params);
    const { id } = await reportService.getReportDetail(userClass, reportId);
    const data = validate(reportValidation.updateStatus, req.body);
    await reportService.updateReportStatus(id, data);
    res.json({
      pesan: 'Berhasil memperbarui status laporan',
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export default {
  createNewReport,
  getAllReports,
  getStudentReports,
  getReportDetail,
  updateReportStatus,
};
