import express from 'express';
import teacherController from '../controllers/teacher.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorize from '../middlewares/authorizeMiddleware.js';

const teacherRouter = express.Router();

teacherRouter
  .route('/profile')
  .all(authMiddleware, authorize('guru'))
  .get(teacherController.getTeacherProfile)
  .patch(teacherController.updateTeacherProfile);

export default teacherRouter;
