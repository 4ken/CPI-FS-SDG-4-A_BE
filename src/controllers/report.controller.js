import reportService from "../services/report.service";

const getAllReports = async (req, res) => {
    try {
        const allReports = await reportService.getAllReports();
        res.json({ allReports });
    } catch ({ message: error, status = 500 }) {
        res.status(status).json({ error });
    }
};

const getReportDetail = async (req, res) => {
    try {
        const { reportId } = req.params;
        const report = await reportService.getReportDetail(reportId);
        if (!report) {
            res.status(404).json({ message: "Laporan tidak ditemukan" });
        } else {
            res.status(200).json({ report });
        }
    } catch ({ message: error, status = 500 }) {
        res.status(status).json({ error });
    }
};

const getStudentReports = async (req, res) => {
    try {
        const { nomorInduk } = req.params;
        const studentReports = await reportService.getStudentReports(
            nomorInduk
        );
        res.json({ studentReports });
    } catch ({ message: error, status = 500 }) {
        res.status(status).json({ error });
    }
};

const createNewReport = async (req, res) => {
    try {
        const { nomorInduk } = req.user;
        const { reportData } = req.body;
        const newReport = await reportService.createNewReport(
            nomorInduk,
            reportData
        );
        res.status(200).json({
            message: "Berhasil membuat laporan",
            data: newReport,
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat laporan" });
    }
};

const updateReportStatus = async (req, res) => {
    const { reportId } = req.params;
    const newReportStatus = req.body;

    try {
        await reportService.updateReportStatus(reportId, newReportStatus);
        res.status(200).json({
            message: "Berhasil memperbaharui status laporan",
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbaharui status laporan" });
    }
};

export {
    getAllReports,
    getReportDetail,
    getStudentReports,
    createNewReport,
    updateReportStatus,
};
