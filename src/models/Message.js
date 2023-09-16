const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
  },
  receiver: {
    type: String,
  },
  text: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
  isUserMessage: {
    type: Boolean,
  },
  isVetMessage: {
    type: Boolean,
  },
  isSellerMessage: {
    type: Boolean,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
