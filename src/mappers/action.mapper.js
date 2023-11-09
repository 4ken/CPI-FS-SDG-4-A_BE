const getAllActionHistory = ({ _id, actionType, createdAt }) => ({
  id: _id,
  keterangan: actionType,
  tanggal: createdAt,
});

export default {
  getAllActionHistory,
};
