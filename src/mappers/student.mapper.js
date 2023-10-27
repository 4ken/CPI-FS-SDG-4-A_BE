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

const getParent = ({ fatherName, motherName, phone, email }) => ({
  namaAyah: fatherName,
  namaIbu: motherName,
  telepon: phone,
  surel: email,
});

export default {
  getStudent,
  getParent,
};
