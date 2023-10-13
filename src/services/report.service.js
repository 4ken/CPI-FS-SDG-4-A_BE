import reportModel from "../models/report.js";
import reportMapper from "../mappers/report.mapper.js";
import studentModel from "../models/student.js";

const createNewReport = async (reporterIdentificationNumber, reportData) => {
    const filter = { reporterIdentificationNumber };
    const reporter = {
        fullName: await studentModel.findOne(filter).fullName,
        studentIdentificationNumber: reporterIdentificationNumber,
    };
    const perpetrator = {
        fullName: reportData.pelaku,
        studentIdentificationNumber: await studentModel.findOne(
            reportData.pelaku
        ).studentIdentificationNumber,
    };

    const incidentDate = reportData.incidentDate;
    const incidentLocation = reportData.incidentLocation;
    const incidentDescription = reportData.incidentDescription;

    const newReport = new reportModel({
        perpetrator,
        reporter,
        incidentDate,
        incidentLocation,
        incidentDescription,
    });

    await newReport.save();
    return newReport;
};

const getAllReports = async () => {
    const allReports = await reportModel.find();
    return await reportModel.find();
};

const getStudentReports = async (nomorInduk) => {
    const filter = { nomorInduk };
    const studentReports = await reportModel.find(filter);
    return studentReports.map(reportMapper.fromModel);
};

const getReportDetail = async (reportId) => {
    const filter = { reportId };
    const report = await reportModel.findOne(filter);
    return reportMapper.fromModel(report);
};

const updateReportStatus = async (reportId, newReportStatus) => {
    const filter = { _id: reportId };
    await reportModel.findOneAndUpdate(filter, {
        reportStatus: newReportStatus,
    });
};

export default {
    createNewReport,
    getAllReports,
    getStudentReports,
    getReportDetail,
    updateReportStatus,
};
