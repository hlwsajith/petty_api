const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/getallusers', UserController.getAllUsers);
router.post('/createuser', UserController.createUser);

module.exports = router;
