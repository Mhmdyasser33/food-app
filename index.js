const dotenv = require("dotenv").config()
const express = require("express")

const app = express()

app.get("/" , (req , res)=>{
    res.send("<h1>Welcome to our food app</h1>")
})


app.listen(process.env.PORT , ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})