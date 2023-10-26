import express from 'express';
import actionController from '../controllers/action.controller';
import authMiddleware from '../middlewares/auth.middleware';
import authorize from '../middlewares/authorize.middleware';

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
