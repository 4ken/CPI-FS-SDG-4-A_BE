import express from 'express';
import reportController from '../controllers/report.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';

const reportRouter = express.Router();

reportRouter.use(authMiddleware);
reportRouter.get(
  '/mine',
  authorize('student'),
  reportController.getStudentReports
);
reportRouter.post('/', reportController.createNewReport);
reportRouter.use(authorize('teacher'));
reportRouter.get('/', reportController.getAllReports);
reportRouter.get('/:reportId', reportController.getReportDetail);
reportRouter.patch('/:reportId/status', reportController.updateReportStatus);

export default reportRouter;
