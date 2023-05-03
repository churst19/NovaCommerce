import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
// const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000
// const { MONGOURI } = require("./keys")
import products from "./data/products.js"

import colors from "colors"
import productRouter from "./routes/productRoutes.js"
dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running...")
})
app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

app.use("/api/products", productRouter)

// app.get("/api/products", (req, res) => {
//   // console.log("home")
//   res.send(products)
// })

// app.use("/api/products", productRouter)
// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((p) => p._id === req.params.id)
//   // req.params.id gets the id only from url params, use this to search for the specific object by that id
//   // console.log(product)
//   res.send(product)
// })

//////

// mongoose.connect(MONGOURI);

// mongoose.connection.on("connected", () => {
//   console.log("Conneted to Mongo");
// });

// mongoose.connection.on("error", (error) => {
//   console.log("Error connecting to Mongo", error);
// });

// const customMiddleware = (req, res, next) => {
//   //user authentication here?
//   console.log("middleware used");
//   next();
// };

// // app.use(customMiddleware)

// app.get("/", customMiddleware, (req, res) => {
//   console.log("home");
//   res.send("hello world");
// });
