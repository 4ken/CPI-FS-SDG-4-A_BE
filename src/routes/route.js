import express from 'express';
import authRouter from './auth.route.js';
import teacherRouter from './teacher.route.js';
import studentRouter from './student.route.js';
import reportRoute from './report.route.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/teacher', teacherRouter);
router.use('/student', studentRouter);
router.use('/report', reportRoute);

export default router;
