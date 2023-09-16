const express = require("express");
const router = express.Router();
const VetController = require("../controllers/VetController");

router.get("/getallvets", VetController.getAllVets);
router.post("/createvet", VetController.createVet);
router.get("/getonelist", VetController.getOneList);
router.get("/getoneincominglist", VetController.getOneIncomingList);
router.get("/getonedetails", VetController.getOneDetails);
router.post("/createappointment", VetController.createAppointment);
router.patch("/changeStatus", VetController.changeStatus);
router.get("/searchvetservices", VetController.searchVetServices);
router.get("/getoneuserlist", VetController.getOneUserList);
router.get("/getalllist", VetController.getList);

module.exports = router;
