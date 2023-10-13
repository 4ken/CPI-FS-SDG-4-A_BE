const fromModel = (data) => ({
    idLaporan: data._id,
    pembully: {
        namaPelaku: data.perpetrator.fullName,
        nomorIndukPelaku: data.perpetrator.studentIdentificationNumber,
    },
    pelapor: {
        namaPelapor: data.reporter.fullName,
        nomorIndukPelapor: data.reporter.studentIdentificationNumber,
    },
    waktuKejadian: data.incidentDate,
    tanggalSubmitLaporan: data.reportSubmissionDate,
    lokasi: data.incidentLocation,
    deskripsiKejadian: data.incidentDescription,
    statusLaporan: data.reportStatus,
});

const toModel = (data) => ({
    _id: data.idLaporan,
    perpetrator: {
        fullName: data.pembully.namaPelaku,
        studentIdentificationNumber: data.pembully.nomorIndukPelaku,
    },
    reporter: {
        fullName: data.pelapor.namaPelaku,
        studentIdentificationNumber: data.pelapor.nomorIndukPelapor,
    },
    incidentDate: data.waktuKejadian,
    reportSubmissionDate: data.tanggalSubmitLaporan,
    incidentLocation: data.lokasi,
    incidentDescription: data.incidentDescription,
    reportStatus: data.statusLaporan,
});

export default {
    fromModel,
    toModel,
};
