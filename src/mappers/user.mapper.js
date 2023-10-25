const getProfile = ({
  employeeIdentificationNumber,
  studentIdentificationNumber,
  fullName,
  placeDateOfBirth,
  address,
}) => ({
  nomorInduk: employeeIdentificationNumber || studentIdentificationNumber,
  nama: fullName,
  tempatTanggalLahir: placeDateOfBirth,
  alamat: address,
});

export default {
  getProfile,
};
