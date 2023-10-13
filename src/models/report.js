import mongoose from "mongoose";

const individualInvolved = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    studentIdentificationNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{10}$/,
    },
});

const reportSchema = new mongoose.Schema({
    perpetrator: {
        type: individualInvolved,
    },
    reporter: {
        type: individualInvolved,
    },
    incidentDate: {
        type: Date,
        required: true,
    },
    reportSubmissionDate: {
        type: Date,
        default: Date.now,
    },
    incidentLocation: {
        type: String,
        required: true,
    },
    incidentDescription: {
        type: String,
        required: true,
    },
    reportStatus: {
        type: String,
        enum: ["belum diproses", "sedang diproses", "selesai"],
        default: "belum diproses",
        required: true,
    },
});

export default mongoose.model("Report", reportSchema);
