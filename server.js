import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import Product from "./models/productModel.js"
import path from "path"

// const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000
// const { MONGOURI } = require("./keys")
// import products from "./data/products.js"

import colors from "colors"
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js"
import Stripe from "stripe"
import cors from cors
dotenv.config()

const corsOptions = {
  origin: "http://localhost:3000" // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));
connectDB()

const app = express()

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

// app.use(express.json())

// if (process.env.NODE_ENV == "production") {
//   // app.use(express.static("frontend/build"))
//   // const path = require("path")
//   //   app.get("*", (req, res) => {
//   //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   //   })
//   app.use(express.static(path.join(__dirname, "build")))

//   app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"))
//   })
// }

app.get("/", (req, res) => {
  res.send("API is running...")
})
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)

app.post("/create-checkout-session", async (req, res) => {
  const data = JSON.parse(req.body.body)

  try {
    const getLineItems = async () => {
      const itemData = await Product.findOne({
        _id: "644c5a791a157b9006704c94",
      })
      let result = []
      for (const item in data) {
        const itemData = await Product.findOne({
          _id: item,
        })
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
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.get("/order/success", async (req, res) => {
  console.log("success API")
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id)
  res.send(session.customer_details.name)
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
