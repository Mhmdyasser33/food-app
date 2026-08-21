const {getCurrentUserService, updateCurrentUserService, updatePasswordService} = require("../../services/user.service")
const getCurrentUser = async(req , res,next)=>{
    try {
      const user = await getCurrentUserService(req.user.userId)
       return res.status(200).json({
        success : true,
        message : "User fetched successfully.",
        data : user
       }) 
    } catch (error) {
        return next(error)
    }
}

const updateCurrentUser = async(req , res , next)=>{
  try {
    const {name , address , phone} = req.body
    const user = await updateCurrentUserService(req.user.userId , {name , address , phone})
    return res.status(200).json({
      success : true,
      message : "User updated successfully.",
      data : user
    })
  } catch (error) {
    return next(error)
  }  
}

const updatePassword = async(req , res , next)=>{
    try {
      const user = await updatePasswordService(req.body,req.user.userId)
        return res.status(200).json({
            success : true,
            message : "Password updated successfully.",
            data : user
        }) 
    } catch (error) {
        return next(error)
    }
}
module.exports = {
  getCurrentUser,
  updateCurrentUser,
  updatePassword
}
