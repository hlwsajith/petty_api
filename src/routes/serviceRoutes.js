const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/ServiceController');

router.get('/getallservices', ServiceController.getAllServices);
router.post('/createservice', ServiceController.createService);
router.get("/searchservices", ServiceController.searchServices);

module.exports = router;
