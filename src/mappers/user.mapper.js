const getProfile = ({
  employeeIdentificationNumber,
  studentIdentificationNumber,
  fullName,
  placeDateOfBirth,
  address,
  teacher,
}) => ({
  nomorInduk: employeeIdentificationNumber || studentIdentificationNumber,
  nama: fullName,
  tempatTanggalLahir: placeDateOfBirth,
  alamat: address,
  waliKelas: teacher,
});

export default {
  getProfile,
};
