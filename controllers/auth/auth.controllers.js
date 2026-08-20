const userModel = require("../../models/user.model")
const authService = require("../../services/auth.service")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
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

const forgotPassword = async(req , res , next) =>{
  try {
    const resetPasswordToken = await authService.userForgotPassword(req.body)
     return res.status(200).json({
        success : true,
        message : "Reset password token sent to your email.",
        token : resetPasswordToken
     })
        }
      catch (error) {
    return next(error)
  }       
  } 

const resetPassword = async(req , res , next)=>{
    try {
        const { token } = req.params  
        await authService.userResetPassword(req.body,token)
        return res.status(200).json({
            success : true,
            message : "Password reset successfully."
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = { register , login  , forgotPassword , resetPassword }