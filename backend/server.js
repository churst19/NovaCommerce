import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import Product from "./models/productModel.js"

// const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000
// const { MONGOURI } = require("./keys")
// import products from "./data/products.js"

import colors from "colors"
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js"
import Stripe from "stripe"
dotenv.config()

connectDB()

const app = express()

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

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
app.use("/api/users", userRouter)

app.post("/create-checkout-session", async (req, res) => {
  console.log("in create checkout session...")
  const data = JSON.parse(req.body.body)
  // console.log("test ", data["644c5a791a157b9006704c94"])
  // getLineItems()

  // console.log(data)
  // for (const item in data) {
  // console.log(item)
  // console.log(data[item])
  // }
  // console.log("end")

  try {
    const getLineItems = async () => {
      // console.log("getLineItems test")
      // const itemData = axios.get(`/api/products/644c5a791a157b9006704c94`)
      const itemData = await Product.findOne({
        _id: "644c5a791a157b9006704c94",
      })
      // console.log("itemdata ", itemData.name)
      // console.log("itemdata ", itemData)
      let result = []
      for (const item in data) {
        // console.log(item)
        const itemData = await Product.findOne({
          _id: item,
        })
        // console.log(itemData)
        result.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: itemData.name,
            },
            //price in cents
            unit_amount: itemData.price * 100,
          },
          quantity: data[item],
        })
      }
      return result
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: await getLineItems(),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
// app.use("/api/orders", orderRouter)

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
