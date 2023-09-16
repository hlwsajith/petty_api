const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    unique: true,
  },
  petName: {
    type: String,
    required: true,
  },
  veterinarianName: {
    type: String,
    required: true,
  },
  appointmentDateTime: {
    type: String,
    required: true,
  },
  appointmentType: {
    type: String,
    required: true,
  },
  reasonForAppointment: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerPhoneNumber: {
    type: String,
    required: true,
  },
  ownerEmailAddress: {
    type: String,
    required: true,
  },
  petSpecies: {
    type: String,
    required: true,
  },
  petBreed: {
    type: String,
    required: true,
  },
  petAge: {
    type: Number,
    required: true,
  },
  vaccinationRecords: {
    type: String,
    required: true,
  },
  medicalHistory: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: String,
    required: true,
  },
  appointmentStatus: {
    type: String,
    required: true,
  },
});

appointmentSchema.pre("save", function (next) {
  // 'this' refers to the current document being saved
  if (!this.appointmentId) {
    // Generate productId based on your logic (e.g., a unique ID, timestamp, etc.)
    // For example, using a timestamp and a random number:
    this.appointmentId =
      Date.now().toString() + Math.random().toString(36).substr(2, 5);
  }
  next();
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
