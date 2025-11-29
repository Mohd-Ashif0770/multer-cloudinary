const express = require('express')
const router = express.Router();
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const uploadImage = require('../controllers/upload-image');


//* Cloudinary Storage Access

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params :{
        folder : "uploads",
        allowed_formats : ["png", "jpeg", "jpg"],
    }
})

const upload = multer({storage});

router.post("/upload", upload.single('image'),uploadImage);
module.exports = router;