const Vet = require("../models/Vet");
const Appointment = require("../models/Appointment");
const jwt = require("jsonwebtoken");
const generateToken = require("../services/token");

const VetController = {
  getAllVets: async (req, res) => {
    try {
      // Verify the token
      // verifyToken(req.headers.authorization);

      // Perform your logic based on the vet information
      // For example, you can restrict access to certain actions based on the vet's role

      const vets = await Vet.find();
      res.json(vets);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createVet: async (req, res) => {
    try {
      // Verify the token
      // verifyToken(req.headers.authorization);

      // Perform your logic based on the vet information
      // For example, you can restrict access to certain actions based on the vet's role

      const { vetname, email, password } = req.body;
      const newVet = new Vet({ vetname, email, password });

      await newVet.save();
      res.status(201).json(newVet);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  getList: async (req, res) => {
    try {

      const appointments = await Appointment.find();

      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  getOneList: async (req, res) => {
    try {
      const vetname = req.query.vetname;

      const appointments = await Appointment.find({
        $or: [{ veterinarianName: vetname }],
      });

      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  getOneIncomingList: async (req, res) => {
    try {
      const vetname = req.query.vetname;
      const incoming = req.query.incoming;

      const appointments = await Appointment.find({
        $or: [
          { vetname, incoming },
          { veterinarianName: vetname, appointmentStatus: incoming },
        ],
      });

      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  getOneUserList: async (req, res) => {
    try {
      const username = req.query.username;

      const appointments = await Appointment.find({
        $or: [
          { ownerName: username }
        ],
      });

      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  getOneDetails: async (req, res) => {
    try {
      const appointmentId = req.query.appointmentId;

      const appointments = await Appointment.findOne({
        appointmentId: appointmentId,
      });
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  createAppointment: async (req, res) => {
    try {
      
      // Verify the token
      // verifyToken(req.headers.authorization);

      // Perform your logic based on the user information
      // For example, you can restrict access to certain actions based on the user's role

      const {
        appointmentId,
        petName,
        veterinarianName,
        appointmentDateTime,
        appointmentType,
        reasonForAppointment,
        ownerName,
        ownerPhoneNumber,
        ownerEmailAddress,
        petSpecies,
        petBreed,
        petAge,
        vaccinationRecords,
        medicalHistory,
        additionalNotes,
        appointmentStatus,
      } = req.body;
      const newAppointment = new Appointment({
        appointmentId,
        petName,
        veterinarianName,
        appointmentDateTime,
        appointmentType,
        reasonForAppointment,
        ownerName,
        ownerPhoneNumber,
        ownerEmailAddress,
        petSpecies,
        petBreed,
        petAge,
        vaccinationRecords,
        medicalHistory,
        additionalNotes,
        appointmentStatus,
      });
      await newAppointment.save();
      console.log("====================================");
      console.log(req.body);
      console.log("====================================");
      res.status(201).json(newAppointment);
    } catch (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      res.status(400).json({ message: err.message });
    }
  },

  changeStatus: async (req, res) => {
    try {
      const status = req.query.status;
      const appointmentId = req.query.appointmentId;

      const appointment = await Appointment.findOne({ appointmentId });

      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }

      appointment.appointmentStatus = status;

      await appointment.save();
      console.log("====================================");
      console.log(res);
      console.log("====================================");
      return res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  searchVetServices: async (req, res) => {
    try {
      const searchQuery = req.query.query;

      const regex = new RegExp(searchQuery, "i");

      // Search products based on the filter
      const vets = await Vet.find({
        $or: [
          { vetname: regex },
          { location: regex },
          { vetcategory: regex },
          // Add other fields as needed
        ],
      });
      res.json(vets);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

// Verify the access token
const verifyToken = (authToken) => {
  if (!authToken) {
    throw new Error("Access token not provided");
  }

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

    // Get the current timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Check if the token has expired
    if (decodedToken.exp <= currentTimestamp) {
      throw new Error("Access token has expired");
    }
  } catch (err) {
    throw new Error("Invalid access token");
  }
};

module.exports = VetController;
