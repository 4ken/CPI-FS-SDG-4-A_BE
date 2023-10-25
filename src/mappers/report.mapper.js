const getReportDetail = ({
  _id,
  createdAt,
  reporterName,
  perpetratorName,
  incidentLocation,
  incidentDate,
  incidentDescription,
  status,
}) => ({
  id: _id,
  waktuDilaporkan: createdAt,
  namaPelapor: reporterName,
  namaPelaku: perpetratorName,
  lokasiKejadian: incidentLocation,
  waktuKejadian: incidentDate,
  deskripsiKejadian: incidentDescription,
  status,
});

const getStudentReports = ({ _id, createdAt, perpetratorName, status }) => ({
  id: _id,
  waktuDilaporkan: createdAt,
  namaPelaku: perpetratorName,
  status,
});

export default {
  getReportDetail,
  getStudentReports,
};
