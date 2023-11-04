import actionModel from '../../models/action.js';

const getActionDAta = async (actionType, studentIdenficationNumber) => {
  const rawData = await actionModel.find({
    student: studentIdenficationNumber,
    actionType: `${actionType}`,
  });

  const processedData = rawData.map((data, i) => ({
    actionType: `${actionType}`,
    number: i + 1,
    timestamps: data.timestamps,
  }));

  const sortedData = processedData.sort((a, b) => b.order - a.order);

  return sortedData;
};

export default getActionDAta;
