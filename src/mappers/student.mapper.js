const getStudent = ({
  studentIdentificationNumber,
  fullName,
  placeDateOfBirth,
  address,
}) => ({
  nomorInduk: studentIdentificationNumber,
  nama: fullName,
  tempatTanggalLahir: placeDateOfBirth,
  alamat: address,
});

const getParent = ({ parent: { fatherName, motherName } }) => ({
  namaAyah: fatherName,
  namaIbu: motherName,
});

export default {
  getStudent,
  getParent,
};
