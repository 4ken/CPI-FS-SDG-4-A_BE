import express from 'express';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import studentRouter from './student.route.js';
import reportRoute from './report.route.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/students', studentRouter);
router.use('/report', reportRoute);

export default router;
