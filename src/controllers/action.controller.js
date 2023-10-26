import handleErrorResponse from '../utils/response/handleErrorResponse';
import actionService from '../services/action.service';

const getDiscplinaryActionHistory = async (req, res) => {
  try {
    const { identificationNumber } = req.user;
    const data =
      await actionService.getDiscplinaryActionHistory(identificationNumber);
    res.json({ data });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const createNewDiscplinaryAction = async (req, res) => {
  try {
    const { identificationNumber } = req.params;

    const data = await actionService.createNewDiscplinaryAction(
      identificationNumber,
      req.body
    );
    res.json({ data });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export default {
  getDiscplinaryActionHistory,
  createNewDiscplinaryAction,
};
