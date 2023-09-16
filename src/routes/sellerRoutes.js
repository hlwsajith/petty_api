const express = require("express");
const router = express.Router();
const SellerController = require("../controllers/SellerController");

router.get("/getallsellers", SellerController.getAllSellers);
router.post("/createseller", SellerController.createSeller);
router.get("/getallproducts", SellerController.getAllProducts);
router.get("/searchproducts", SellerController.searchProducts);

module.exports = router;
