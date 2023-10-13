import express from "express";
import reportController from "../controllers/report.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorizeMiddleware.js";

const reportRoute = express.Router();

reportRoute.use(authMiddleware);
reportRoute.get("/", authorize("guru"), reportController.getAllReports);
reportRoute.get(
    "/:nomorInduk(\\d+)",
    authorize("siswa"),
    reportController.getStudentReports
);
reportRoute.post("/", authorize("siswa"), reportController.createNewReport);

reportRoute
    .route("/:idLaporan")
    .all(authorize("guru"))
    .get(reportController.getReportDetail)
    .patch(reportController.updateReportStatus);

export default reportRoute;
