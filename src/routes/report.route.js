import express from 'express';
import reportController from '../controllers/report.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorize from '../middlewares/authorizeMiddleware.js';

const reportRoute = express.Router();

reportRoute.use(authMiddleware);
reportRoute.get('/', authorize('teacher'), reportController.getAllReports);
reportRoute.get(
  '/:identificationNumber(\\d+)',
  authorize('student'),
  reportController.getStudentReports
);
reportRoute.post('/', authorize('student'), reportController.createNewReport);

reportRoute
  .route('/:reportId')
  .all(authorize('teacher'))
  .get(reportController.getReportDetail)
  .patch(reportController.updateReportStatus);

export default reportRoute;
