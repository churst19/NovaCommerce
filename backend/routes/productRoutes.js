import express from "express"
import Product from "../models/productModel.js"

const productRouter = express.Router()

//get all products
productRouter.get("/", async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//get product by id
productRouter.get("/:id", async (req, res) => {
  // req.params.id gets the id only from url params, use this to search for the specific object by that id
  try {
    const product = await Product.findOne({ _id: req.params.id })
    res.json(product)
  } catch (err) {
    console.log(err)
  }
})

export default productRouter
