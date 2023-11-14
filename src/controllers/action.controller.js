import handleErrorResponse from '../utils/response/handleErrorResponse.js';
import actionService from '../services/action.service.js';
import validate from '../validations/validation.js';
import actionValidation from '../validations/action.validation.js';

const getAllActionHistory = async (req, res) => {
  try {
    const { identificationNumber } = req.user;
    const data = await actionService.getAllActionHistory(identificationNumber);
    res.json({ data });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getStudentActionHistory = async (req, res) => {
  try {
    const { studentIdentificationNumber } = req.params;
    const data = await actionService.getAllActionHistory(
      studentIdentificationNumber
    );
    res.json({ data });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const createNewAction = async (req, res) => {
  try {
    const { studentIdentificationNumber } = req.params;
    const data = validate(actionValidation.create, req.body);

    await actionService.createNewAction(studentIdentificationNumber, data);

    res.json({
      pesan: 'Berhasil membuat tindakan',
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export default {
  getAllActionHistory,
  createNewAction,
  getStudentActionHistory,
};
