import actionModel from '../models/action.js';

const getDiscplinaryActionHistory = async (studentIdenficationNumber) => {
  const actionHistory = await actionModel.find({
    student: studentIdenficationNumber,
  }).disciplinaryActionHistory;
  return { actionHistory };
};

const createNewDiscplinaryAction = async (studentIdenficationNumber, data) => {
  const filter = { student: studentIdenficationNumber };
  const newAction = { action: data };

  const action = await actionModel.findOne(filter);

  action.currentDisciplinaryAction = newAction;
  if (action.disciplinaryActionHistory.length === 1) {
    action.disciplinaryActionHistory = action;
  } else {
    action.disciplinaryActionHistory.push({
      action: newAction,
    });
  }

  await action.save();

  return { action };
};

export default {
  getDiscplinaryActionHistory,
  createNewDiscplinaryAction,
};
