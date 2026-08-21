const bcrypt = require("bcrypt")
const userModel = require("../models/user.model")

const getCurrentUserService = async(userId)=>{
     const user = await userModel.findById(userId)
     if(!user){
        const err = new Error("User not found")
        err.statusCode = 404
        throw err
       }
       return user
}

const updateCurrentUserService =  async(userId ,data)=>{
    const updatedData = {}
    if(data.name !== undefined) updatedData.name = data.name.trim()
    if(data.phone !== undefined) updatedData.phone = data.phone.trim()
    if(data.address !== undefined) updatedData.address = data.address.map(address => address.trim())
 const user = await userModel.findByIdAndUpdate(userId,updatedData , {new : true,runValidators : true})
    if(!user){
      const err = new Error("User not found")
      err.statusCode = 404
      throw err
    }
    return user
}

const updatePasswordService = async(data , userId)=>{
  const user = await userModel.findById(userId).select("+password");
  if(!user){
           const err = new Error("User not found")
           err.statusCode = 404
           throw err
        }
         const {oldPassword , newPassword} = data
          if(!oldPassword || !newPassword){
            const err = new Error("Please provide old password and new password.")
            err.statusCode = 400
            throw err
        }
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword , user.password)
         if(!isOldPasswordCorrect){
            const err = new Error("Old password is incorrect.")
            err.statusCode = 401
            throw err
        }
         const isNewPasswordSameOld = await bcrypt.compare(newPassword , user.password)
        if(isNewPasswordSameOld){
            const err = new Error("New password cannot be same as old password.")
            err.statusCode = 400
            throw err
        }
         const hashedNewPassword = await bcrypt.hash(newPassword , 12)
         user.password = hashedNewPassword
         await user.save()
         return;

}
module.exports = {
    getCurrentUserService,
    updateCurrentUserService,
    updatePasswordService
}