import express from "express"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import createJWT from "../utils/auth.js"

const userRouter = express.Router()

//copied from products, to be updated

//get all users
// userRouter.get("/", async (req, res) => {
//   const users = await User.find({})
//   res.json(users)
// })

//test
userRouter.post("/signup", async (req, res) => {
  // console.log(req.body)
  const temp = req.body
  const user = { ...temp, password: bcrypt.hashSync(req.body.password, 10) }
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
    if (user) {
      const passwordMatches = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (passwordMatches) {
        user.password = undefined
        const access_token = createJWT(user.email, user._id, 3600)
        jwt.verify(access_token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            res.status(500).json({ error: err })
          }
          if (decoded) {
            return res.status(200).json({
              success: true,
              token: access_token,
              message: user,
            })
          }
        })
      } else {
        res
          .status(404)
          .json({ error: "User not found or password does not match" })
      }
    } else {
      res
        .status(404)
        .json({ error: "User not found or password does not match" })
    }
  } catch (err) {
    //TODO: remove consle log
    console.log(err)
    res.json({ error: err })
  }
})

//create user

//update user. to be done later.

export default userRouter
