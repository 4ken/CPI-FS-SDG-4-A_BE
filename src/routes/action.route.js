import express from 'express';
import actionController from '../controllers/action.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';

const actionRouter = express.Router();

actionRouter.use(authMiddleware);

actionRouter.get(
  '/mine',
  authorize('student'),
  actionController.getAllActionHistory
);
actionRouter.post(
  '/:studentIdentificationNumber',
  authorize('teacher'),
  actionController.createNewAction
);

export default actionRouter;
