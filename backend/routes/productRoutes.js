const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const { createProduct } = require("../controllers/productController");

// Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["png", "jpeg", "jpg"],
  },
});

const upload = multer({ storage });

router.post("/create", upload.single("image"), createProduct);
module.exports = router;
