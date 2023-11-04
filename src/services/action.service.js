import actionModel from '../models/action.js';
import getActionDAta from '../utils/action/getActionData.js';

const getDisciplinaryActionHistory = async (studentIdenficationNumber) => {
  const allActionHistory = [
    ...(await getActionDAta(
      'Pemanggilan Orang Tua',
      studentIdenficationNumber
    )),
    ...(await getActionDAta('Surat Peringatan', studentIdenficationNumber)),
    ...(await getActionDAta(
      'Pemanggilan oleh Bimbingan Konseling',
      studentIdenficationNumber
    )),
  ];

  if (!allActionHistory) {
    return [];
  }
  const sortedHistory = allActionHistory.sort(
    (a, b) => b.timestamps - a.timestamps
  );

  return sortedHistory;
};

const createNewDiscplinaryAction = async (
  studentIdentificationNumber,
  data
) => {
  await actionModel.create({
    student: studentIdentificationNumber,
    actionType: data,
  });
};

export default {
  getDisciplinaryActionHistory,
  createNewDiscplinaryAction,
};
