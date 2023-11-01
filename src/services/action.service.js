import actionModel from '../models/action.js';

const getDiscplinaryActionHistory = async (studentIdenficationNumber) => {
  const actionHistory = await actionModel.findAll({
    student: studentIdenficationNumber,
  });
  return { actionHistory };
};

const createNewDiscplinaryAction = async (studentIdenficationNumber, data) => {
  const prevSameTypeAction = actionModel.findOne({
    student: studentIdenficationNumber,
    actionType: data,
  });

  if (!prevSameTypeAction) {
    await actionModel.create({
      student: studentIdenficationNumber,
      actionType: data,
      actionCounter: 1,
      actionTimestamps: [Date.now()],
    });
  } else {
    prevSameTypeAction.actionCounter += 1;
    prevSameTypeAction.actionTimestamps(Date.now());
    await prevSameTypeAction.save();
  }
};

export default {
  getDiscplinaryActionHistory,
  createNewDiscplinaryAction,
};
