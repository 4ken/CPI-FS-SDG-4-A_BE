import actionModel from '../../models/action.js';

const getActionData = async (actionType, student) => {
  const rawData = await actionModel.find({ actionType, student }).lean();

  const processedData = rawData.map((data, i) => ({
    ...data,
    actionType: `${data.actionType} ${i + 1}`,
  }));

  return processedData;
};

export default getActionData;
