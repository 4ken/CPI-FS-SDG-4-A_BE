const fromModel = (data) => ({
  nomorInduk: data.studentIdentificationNumber,
  nama: data.fullName,
  tempatTanggalLahir: data.placeDateOfBirth,
  alamat: data.address,
});

export default {
  fromModel,
};
