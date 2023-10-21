const fromModel = (data) => {
  const {
    employeeIdentificationNumber,
    studentIdentificationNumber,
    fullName,
    placeDateOfBirth,
    address,
  } = data;

  return {
    nomorInduk: employeeIdentificationNumber || studentIdentificationNumber,
    nama: fullName,
    tempatTanggalLahir: placeDateOfBirth,
    alamat: address,
  };
};

export default {
  fromModel,
};
