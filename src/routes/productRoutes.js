const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/getallproducts", ProductController.getAllProducts);
router.post("/createproduct", ProductController.createProduct);
router.get("/searchproducts", ProductController.searchProducts);
router.get("/getoneproduct", ProductController.getOneProduct);
router.patch("/editproduct", ProductController.editProduct);
router.delete("/deleteproduct", ProductController.deleteProduct);

module.exports = router;
