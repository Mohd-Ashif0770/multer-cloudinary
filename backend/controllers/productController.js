const Product = require('../models/product');


const createProduct = async (req,res)=>{
    try {
        const {name, price} = req.body;
        
        // Check if file was uploaded
        if(!req.file){
            return res.status(400).json({
                success : false,
                msg : "Please upload an image"
            })
        }

        // Get Cloudinary URL from multer
        const imageURL = req.file.path;

        const product = await Product.create({
            name,
            price,
            imageURL: imageURL
        })
        
        return res.status(201).json({
            success : true,
            msg : "Product Created",
            data : product
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            msg : error.message || "Error creating product"
        })
    }
}

module.exports = {createProduct};