import express from 'express';
import studentController from '../controllers/student.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';

const studentRouter = express.Router();

studentRouter.use([authMiddleware, authorize('teacher')]);

studentRouter.get('/', studentController.getAllStudents);
studentRouter.get('/:nomorInduk(\\d{10})', studentController.getStudentDetail);

export default studentRouter;
