const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Cloudinary Storage Configuration for products
const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["png", "jpeg", "jpg"],
  },
});

// Create multer upload middleware for products
const uploadProduct = multer({ storage: productStorage });

module.exports = {
  cloudinary,
  uploadProduct,
};
