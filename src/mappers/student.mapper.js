const fromModel = (data) => ({
  nomorInduk: data.studentIdentificationNumber,
  nama: data.fullName,
  tempatTanggalLahir: data.placeDateOfBirth,
  alamat: data.address,
  orangTua: {
    namaAyah: data.parent?.fatherName,
    namaIbu: data.parent?.motherName,
  },
});

const toModel = (data) => ({
  studentIdentificationNumber: data.nomorInduk,
  fullName: data.nama,
  placeDateOfBirth: data.tempatTanggalLahir,
  address: data.alamat,
  parent: {
    fatherName: data.orangTua?.namaAyah,
    motherName: data.orangTua?.namaIbu,
  },
});

export default {
  fromModel,
  toModel,
};
