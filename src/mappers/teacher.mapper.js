const fromModel = (data) => ({
  nomorInduk: data.employeeIdentificationNumber,
  nama: data.fullName,
  tempatTanggalLahir: data.placeDateOfBirth,
  alamat: data.address,
});

const toModel = (data) => ({
  employeeIdentificationNumber: data.nomorInduk,
  fullName: data.nama,
  placeDateOfBirth: data.tempatTanggalLahir,
  address: data.alamat,
});

export default {
  fromModel,
  toModel,
};
