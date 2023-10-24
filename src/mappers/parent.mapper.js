const fromModel = (data) => {
  const { fatherName: namaAyah, motherName: namaIbu } = data.parent;
  return { namaAyah, namaIbu };
};

export default {
  fromModel,
};
