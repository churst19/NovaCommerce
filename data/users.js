import bcrypt from "bcryptjs"
// these are some test users
const users = [
  {
    username: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    username: "Chris",
    email: "chris@chris.com",
    password: bcrypt.hashSync("123456"),
  },
  {
    username: "Kim",
    email: "kim@kim.com",
    password: bcrypt.hashSync("123456"),
  },
]

export default users
