const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const  crypto = require("crypto")
const jwt = require("jsonwebtoken")


const userRegister = async (data) => {
  let { name, password, email, phone, address } = data;
  if (!name || !password || !email || !phone || !address) {
    const err = new Error("All fields are required.");
    err.statusCode = 400;
    throw err;
  }
  name = name.trim();
  email = email.trim().toLowerCase();
  phone = phone.trim();
  address = address.map((item) => item.trim());
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    const err = new Error("User already exists.");
    err.statusCode = 409;
    throw err;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
  });
  const response = user.toObject();
  delete response.password;
  return response;
};

const userLogin = async(data)=>{
   let {email , password} = data
        if(!email || !password){
            const err = new Error("Email and password are required.");
            err.statusCode = 400;
            throw err 
        }
        email = email.trim().toLowerCase()
         const user = await userModel.findOne({email}).select("+password") 
         if(!user){
            const err = new Error("Invalid email or password.");
            err.statusCode = 401;
            throw err 
        }
         const isMatch = await bcrypt.compare(password , user.password)
          if(!isMatch){
            const err = new Error("Invalid email or password.");
            err.statusCode = 401;
            throw err
        }
         const token = jwt.sign({userId : user._id},process.env.JWT_SECRET_KEY,{expiresIn : process.env.JWT_EXPIRES_IN})
         return token
}

const userForgotPassword = async(data)=>{
  let { email } = data 
   if(!email){
     const err = new Error("Email is required.");
     err.statusCode = 400;
     throw err
     }
     const user = await userModel.findOne({email})
      if(!user){
         const err = new Error("Invalid email.");
         err.statusCode = 404;
         throw err
      }
       const resetPasswordToken = crypto.randomBytes(32).toString("hex")
       const hashResetPasswordToken = crypto.createHash("sha256").update(resetPasswordToken).digest("hex")
       user.resetPasswordToken = hashResetPasswordToken
       user.resetPasswordExpires = Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRES_IN) * 60 * 1000
        await user.save()
        return resetPasswordToken
} 

const userResetPassword = async(data , token)=>{
  const {password , confirmPassword} = data
  if(!password || !confirmPassword){
          const err = new Error("Password and confirm password are required.");
          err.statusCode = 400;
          throw err
        }
        if(password !== confirmPassword){
            const err = new Error("Password and confirm password do not match.");
            err.statusCode = 400;
            throw err
        }
        const hashResetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
        const user = await userModel.findOne({resetPasswordToken : hashResetPasswordToken,resetPasswordExpires : {$gt : Date.now()}})
        if(!user){
            const err = new Error("Invalid reset password token.");
            err.statusCode = 404;
            throw err
        }
        user.password = await bcrypt.hash(password, 12)
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()
        return user
}


module.exports = {
  userRegister,
  userLogin,
  userForgotPassword,
  userResetPassword
};
