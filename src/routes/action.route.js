import express from 'express';
import actionController from '../controllers/action.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';

const actionRouter = express.Router();

actionRouter.use(authMiddleware);

actionRouter.get(
  '/',
  authorize('student'),
  actionController.getDiscplinaryActionHistory
);

actionRouter.use(authorize('teacher'));
actionRouter.post(
  '/:studentIdentificationNumber',
  actionController.createNewDiscplinaryAction
);

export default actionRouter;
