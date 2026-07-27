const userModel = require("../../models/user.model")
const authService = require("../../services/auth.service")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const register = async(req , res , next)=>{
    try {
       const user = await authService.userRegister(req.body)
        return res.status(201).json({
            success : true,
            message : "User registered successfully.",
            data : user
        })
    } catch (error) {
        next(error)
    }
}  

const login = async(req , res , next)=>{
    try {
        const userToken = await authService.userLogin(req.body)
        return res.status(200).json({
            success : true,
            message : "User login successfully.",
            token : userToken
        })
    } catch (error) {
        next(error)
    }

}

module.exports = { register , login }