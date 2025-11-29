const express = require("express");
const router = express.Router();
const { uploadProduct } = require("../config/cloudinary");
const { createProduct } = require("../controllers/productController");

router.post("/create", uploadProduct.single("image"), createProduct);
module.exports = router;
