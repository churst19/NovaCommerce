import express from "express"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"

const userRouter = express.Router()

//copied from products, to be updated

//get all users
// userRouter.get("/", async (req, res) => {
//   const users = await User.find({})
//   res.json(users)
// })

//test
userRouter.post("/signup", async (req, res) => {
  console.log(req.body)
  const temp = req.body
  const user = { ...temp, password: bcrypt.hashSync(req.body.password) }
  await User.create(user)
  try {
    res.json({ msg: "User added successfully" })
  } catch (err) {
    res.status(400).json({ error: err })
  }
  // console.log(err)
  // const data = await req
  // res.(data)
  // res.json("See console log")
})

//get user by id
userRouter.post("/login", async (req, res) => {
  // req.params.id gets the id only from url params, use this to search for the specific object by that id
  // console.log("here")
  try {
    const user = await User.findOne({ email: req.body.email })
    console.log(user.password)
    const result = await bcrypt.compare(req.body.password, user.password)
    console.log(result)
    // res.json(user)
  } catch (err) {
    console.log(err)
  }
})

//create user

//update user. to be done later.

export default userRouter
