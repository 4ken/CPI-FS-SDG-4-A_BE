const getReportDetail = (data) => ({
  id: data._id,
  waktuDilaporkan: data.createdAt,
  namaPelapor: data.reporterName,
  namaPelaku: data.perpetratorName,
  lokasiKejadian: data.incidentLocation,
  waktuKejadian: data.incidentDate,
  deskripsiKejadian: data.incidentDescription,
  status: data.status,
});

const getStudentReports = (data) => ({
  id: data._id,
  waktuDilaporkan: data.createdAt,
  namaPelaku: data.perpetratorName,
  status: data.status,
});

export default {
  getReportDetail,
  getStudentReports,
};
