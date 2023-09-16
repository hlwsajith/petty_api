const express = require("express");
const router = express.Router();
const AuthController = require("../middlewares/auth");

router.post("/login", AuthController.Login);
router.post("/sellerlogin", AuthController.SellerLogin);
router.post("/vetlogin", AuthController.VetLogin);
router.post("/adminlogin", AuthController.AdminLogin);

module.exports = router;
