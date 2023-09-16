const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const jwt = require("jsonwebtoken");
const { getMessaging } = require("firebase-admin/messaging");
const bodyParser = require("body-parser"); // Add this line

const AuthRoutes = require("../routes/authRouter");
const userRoutes = require("../routes/userRoutes");
const sellerRoutes = require("../routes/sellerRoutes");
const vetRoutes = require("../routes/vetRoutes");
const animalRoutes = require("../routes/animalRoutes");
const productRoutes = require("../routes/productRoutes");
const serviceRoutes = require("../routes/serviceRoutes");
const reminderRoutes = require("../routes/reminderRoutes");
const messageRoutes = require("../routes/MessageRoutes");
const breedRoute = require("../routes/breedRoute");
const Message = require("../models/Message");

const app = express();

const server = http.createServer(app);
require("dotenv").config();
const io = socketIo(server);

// Enable CORS for all routes
app.use(cors());

// Middleware configuration
app.use(express.json());

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: true })); // Add this line
app.use(bodyParser.json()); // Add this line

const messages = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", async (message) => {
    console.log("====================================");
    console.log(message);
    console.log("====================================");
    try {
      const messages = JSON.parse(message);
      const sender = messages.sender;
      const receiver = messages.receiver;
      const text = messages.text;
      const timestamp = messages.timestamp;
      const isUserMessage = messages.isUserMessage;
      const isSellerMessage = messages.isSellerMessage;
      const isVetMessage = messages.isVetMessage;

      const chatMessage = new Message({
        sender: sender,
        receiver: receiver,
        text: text,
        timestamp: new Date(),
        isUserMessage: isUserMessage,
        isSellerMessage:isSellerMessage,
        isVetMessage: isVetMessage
      });
      await chatMessage.save();
      io.emit("message", message);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Initialize Firebase Admin SDK
initializeApp({
  credential: applicationDefault(),
  projectId: "adoptv2-a7a23",
});

// Get the Messaging instance
const messaging = getMessaging();

// Authenticated Routes
app.use("/authenticated", AuthRoutes);

// Routes
app.use("/users", userRoutes);
app.use("/sellers", sellerRoutes);
app.use("/vets", vetRoutes);
app.use("/animals", animalRoutes);
app.use("/products", productRoutes);
app.use("/service", serviceRoutes);
app.use("/reminder", reminderRoutes);
app.use("/message", messageRoutes);
app.use("/breeds", breedRoute);

module.exports = { app, server };
