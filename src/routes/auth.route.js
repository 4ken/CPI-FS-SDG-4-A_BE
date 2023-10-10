import express from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post(
  '/reset-password',
  authMiddleware,
  authController.resetPassword
);

export default authRouter;
