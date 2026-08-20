const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "name is required"]
    },
    email : {
        type : String,
        unique : true,
        required : [true , "email is required"]
    },
    password : {
        type : String,
        required : [true , "password is required"],
        select : false
    },
    address : {
        type : [String]
    },
    phone : {
        type : String,
        required : [true , "phone is required"]
    },
    userType : {
        type : String,
        required : [true , "user type is required"],
        default : "client",
        enum : ["client" , "admin" , "vendor" , "driver"]
    },
    profile : {
        type : String,
        default : "https://www.flaticon.com/free-icon/user_9308008"
    },
    resetPasswordToken : {
        type : String,
        select : false
    },
    resetPasswordExpires : {
        type : Date,
        select : false,
    }
},{timestamps : true})

module.exports = mongoose.model("User" , userSchema)
