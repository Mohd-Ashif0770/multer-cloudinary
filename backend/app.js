require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const productRouter = require("./routes/productRoutes");

const corsOption = {
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));
app.use("/api/product", productRouter);

//! IIFE : Immediately Invoked Function Expression
(async function () {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log("Connected with PORT", process.env.PORT);
  });
})();
