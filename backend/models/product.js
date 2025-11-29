const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    price :{
        type : String,
        required : true,
    },
    imageURL :{
        type : String,
        default : ""
    }
})

const Product = mongoose.model("product", productSchema);
module.exports = Product;