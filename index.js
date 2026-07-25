const dotenv = require("dotenv").config()
const express = require("express")
const cors = require("cors")

const PORT = process.env.PORT || 5001
const corsOptions = require("./config/allowedOptions")
const app = express()
app.use(cors(corsOptions))
app.use(express.json())

app.get("/" , (req , res)=>{
    res.send("<h1>Welcome to our food app</h1>")
})


app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`)
})