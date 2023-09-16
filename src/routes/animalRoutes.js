const express = require("express");
const router = express.Router();
const AnimalController = require("../controllers/AnimalController");

router.get("/getallanimals", AnimalController.getAllAnimals);
router.get("/getalluseranimals", AnimalController.getAllUserAnimals);
router.post("/createanimal", AnimalController.createAnimal);
router.get("/searchanimals", AnimalController.searchAnimals);
router.get("/searchuseranimals", AnimalController.searchUserAnimals);
router.get("/filteranimals", AnimalController.filterAnimals);
router.get("/getoneanimal", AnimalController.getOneAnimal);
router.patch("/editanimal", AnimalController.editAnimal);
router.delete("/deleteanimal", AnimalController.deleteAnimal);

module.exports = router;
