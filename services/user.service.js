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


module.exports = {
    getCurrentUserService,
    updateCurrentUserService
}