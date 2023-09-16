const Message = require("../models/Message");

const MessageController = {
  saveMessage: async (req, res) => {
    try {
      const { content, receiver } = req.body;
      const sender = req.user._id; // Assuming you have an authentication middleware setting req.user with the authenticated user's data
      const message = new Message({ content, sender, receiver });
      await message.save();
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  getMessages: async (req, res) => {
    try {
      const sender = req.user._id;
      const receiver = req.params.sellerId;
      const messages = await Message.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      }).sort({ timestamp: 1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  fetchParticularChats: async (req, res) => {
    try {
      console.log("====================================");
      console.log(req.query);
      console.log("====================================");
      const receiver = req.query.receiver;
      const username = req.query.username;
      const messages = await Message.find({
        $or: [
          { sender: username, receiver },
          { sender: receiver, receiver: username },
        ],
      }).sort({ timestamp: 1 }); // Sort by timestamp in ascending order

      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  fetchSellerParticularChats: async (req, res) => {
    try {
      const receiver = req.query.receiver;
      const sender = req.query.sender;
      const messages = await Message.find({
        $or: [
          { sender: sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      }).sort({ timestamp: 1 }); // Sort by timestamp in ascending order
      
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  fetchChatLists: async (req, res) => {
    try {
      const username = req.query.username;

      const messages = await Message.aggregate([
        {
          $match: {
            $or: [{ sender: username }],
          },
        },
        {
          $sort: { timestamp: -1 }, // Sort by timestamp in descending order
        },
        {
          $group: {
            _id: "$receiver", // Group by receiver
            receiverName: { $first: "$receiver" }, // Capture the receiver's name
            lastTimestamp: { $first: "$timestamp" }, // Capture the timestamp of the last message
          },
        },
        {
          $project: {
            _id: 0, // Exclude the _id field
          },
        },
      ]);

      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  fetchSVChatLists: async (req, res) => {
    try {
      const username = req.query.username;

      const messages = await Message.aggregate([
        {
          $match: {
            $or: [{ receiver: username }],
          },
        },
        {
          $sort: { timestamp: -1 }, // Sort by timestamp in descending order
        },
        {
          $group: {
            _id: "$sender", // Group by receiver
            receiverName: { $first: "$sender" }, // Capture the receiver's name
            lastTimestamp: { $first: "$timestamp" }, // Capture the timestamp of the last message
          },
        },
        {
          $project: {
            _id: 0, // Exclude the _id field
          },
        },
      ]);

      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = MessageController;
