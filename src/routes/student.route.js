import express from 'express';
import studentController from '../controllers/student.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorize from '../middlewares/authorizeMiddleware.js';

const studentRouter = express.Router();

studentRouter.use(authMiddleware);
studentRouter.get('/', authorize('guru'), studentController.getAllStudent);
studentRouter.get('/:nomorInduk(\\d+)', authorize('guru'), studentController.getStudentDetail);
studentRouter
    .route('/profile')
    .all(authorize('siswa'))
    .get(studentController.getStudentProfile)
    .patch(studentController.updateStudentProfile);

export default studentRouter;
