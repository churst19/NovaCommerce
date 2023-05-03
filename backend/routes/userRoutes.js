import express from "express"
import User from "../models/productUser.js"

const userRouter = express.Router()

//copied from products, to be updated

//get all users
userRouter.get("/", async (req, res) => {
  const users = await Product.find({})
  res.json(users)
})

//get user by id
userRouter.get("/:id", async (req, res) => {
  // req.params.id gets the id only from url params, use this to search for the specific object by that id
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.json(user)
  } catch (err) {
    console.log(err)
  }
})

export default userRouter
