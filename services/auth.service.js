const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const userRegister = async (data) => {
  let { name, password, email, phone, address } = data;
  if (!name || !password || !email || !phone || !address) {
    const err = new Error("All fields are required.");
    err.statusCode = 400;
    throw err
  }
  name = name.trim();
  email = email.trim().toLowerCase();
  phone = phone.trim();
  address = address.map((item) => item.trim());
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    const err = new Error("User already exists.");
    err.statusCode = 409;
    throw err
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


module.exports = {
  userRegister,
  userLogin
};
