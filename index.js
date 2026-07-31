const corsOptions = require("./config/allowedOptions")
const authRoutes = require("./routes/auth/auth.route")
const dbConnect = require("./config/db")
const dotenv = require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler")
const userRoutes = require("./routes/user/user.route")
const PORT = process.env.PORT || 5001
const app = express()

dbConnect()
app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan("dev"))
app.use("/api/auth" , authRoutes)
app.use("/api/user" , userRoutes)
app.use(errorHandler)

app.get("/" , (req , res)=>{
    res.send("<h1>Welcome to our food app</h1>")
})


app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`)
})