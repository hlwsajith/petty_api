const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");

router.get("/getmessages", MessageController.getMessages);
router.get("/fetchParticularChats", MessageController.fetchParticularChats);
router.get(
  "/fetchParticularsvChats",
  MessageController.fetchSellerParticularChats
);
router.post("/savemessage", MessageController.saveMessage);
router.get("/fetchChatLists", MessageController.fetchChatLists);
router.get("/fetchsvChatLists", MessageController.fetchSVChatLists);

module.exports = router;
