require('dotenv').config()
const express = require('express')
const app = express();
const router = require('./routes/uploadRoute');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const productRouter = require('./routes/productRoutes');
const corsOption = {
    origin : "http://localhost:5173",
    methods : ["POST", "GET", "PUT", "DELETE"],
    credentials : true,
}
app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cors(corsOption))

app.use('/api/product', productRouter);
app.use('/api', router);
//! IIFE : Immediately Invoked Function Expression
(async function (){
    await connectDB();
    app.listen(process.env.PORT, ()=>{
        console.log("Connected with PORT", process.env.PORT);
    })
})();

