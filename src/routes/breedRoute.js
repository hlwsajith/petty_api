const express = require("express");
const router = express.Router();
const BreedController = require("../controllers/BreedController");

router.get("/getonebreed", BreedController.getOneBreed);

module.exports = router;
