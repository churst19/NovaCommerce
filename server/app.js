const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 5000
const {MONGOURI} = require("./keys")

mongoose.connect(MONGOURI)

mongoose.connection.on('connected',()=>{
    console.log("Conneted to Mongo")
})

mongoose.connection.on('error',(error)=>{
    console.log("Error connecting to Mongo", error)
})

const customMiddleware =(req,res,next)=>{
    //user authentication here?
    console.log("middleware used")
    next()
}

// app.use(customMiddleware)


app.get('/', customMiddleware,(req,res) =>{
    console.log("home")
    res.send("hello world")
})

app.listen(PORT, ()=>{
    console.log("Server is running on port", PORT)
})