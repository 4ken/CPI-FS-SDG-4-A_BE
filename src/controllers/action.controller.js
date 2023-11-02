import handleErrorResponse from '../utils/response/handleErrorResponse.js';
import actionService from '../services/action.service.js';

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
    const { studentIdentificationNumber } = req.params;
    const { actionType } = req.body;

    await actionService.createNewDiscplinaryAction(
      studentIdentificationNumber,
      actionType
    );
    res.json({
      pesan: 'Berhasil membuat tindakan',
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export default {
  getDiscplinaryActionHistory,
  createNewDiscplinaryAction,
};
