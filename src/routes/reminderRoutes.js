const express = require('express');
const router = express.Router();
const ReminderController = require('../controllers/ReminderController');

router.get('/getallreminders', ReminderController.fetchReminders);
// router.get('/savereminder', ReminderController.saveReminders);
router.post('/sendreminders', ReminderController.saveReminder);
// router.post('/createproduct', ProductController.createProduct);
// router.get("/searchproducts", ProductController.searchProducts);
// router.get("/getoneproduct", ProductController.getOneProduct);

module.exports = router;
