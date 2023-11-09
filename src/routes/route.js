import express from 'express';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import studentRouter from './student.route.js';
import reportRouter from './report.route.js';
import actionRouter from './action.route.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/students', studentRouter);
router.use('/reports', reportRouter);
router.use('/actions', actionRouter);

export default router;
