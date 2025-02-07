import express from 'express';
import studentController from '../controllers/student.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';

const studentRouter = express.Router();

studentRouter.use(authMiddleware);

studentRouter.get('/', studentController.getAllStudents);
studentRouter.get(
  '/:identificationNumber',
  authorize('teacher'),
  studentController.getStudentDetail
);

export default studentRouter;
