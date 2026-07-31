const jwt = require("jsonwebtoken")

const authMiddleware = (req , res , next)=>{
    try {
       const authHeader = req.headers.authorization
       if(!authHeader){
       const err = new Error("Authorization header is missing.")
       err.statusCode = 401
       return next(err)
       }
       if(!authHeader.startsWith("Bearer ")){
        const err = new Error("Invalid authorization format.")
        err.statusCode = 401
        return next(err)
       }
        const token  = authHeader.slice(7).trim();
        if(!token){
            const err = new Error("Token is missing.")
            err.statusCode = 401
            return next(err)
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
        req.user =  decoded;
        return next()
    } catch (error) {
        error.statusCode = 401
        return next(error)
    }
}

module.exports = authMiddleware
