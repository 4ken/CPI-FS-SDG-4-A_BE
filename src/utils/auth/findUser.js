import userModel from '../../models/user.js';

const findUser = async (identificationNumber) => {
  const user = await userModel.findOne({
    $or: [
      { employeeIdentificationNumber: identificationNumber },
      { studentIdentificationNumber: identificationNumber },
    ],
  });
  return user;
};

export default findUser;
