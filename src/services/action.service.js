import actionModel from '../models/action.js';

const getDiscplinaryActionHistory = async (studentIdenficationNumber) => {
  const disciplinaryActionHistory = await actionModel.find({
    student: studentIdenficationNumber,
  });
  return { disciplinaryActionHistory };
};

const createNewDiscplinaryAction = async (
  studentIdentificationNumber,
  data
) => {
  const prevSameTypeAction = await actionModel.findOne({
    student: studentIdentificationNumber,
    actionType: data,
  });

  if (!prevSameTypeAction) {
    await actionModel.create({
      student: `${studentIdentificationNumber}`,
      actionType: data,
      actionCounter: 1,
      actionTimestamps: [Date.now()],
    });
  }
  if (prevSameTypeAction) {
    prevSameTypeAction.actionCounter += 1;
    prevSameTypeAction.actionTimestamps.push(Date.now());
    await prevSameTypeAction.save();
  }
};

export default {
  getDiscplinaryActionHistory,
  createNewDiscplinaryAction,
};
