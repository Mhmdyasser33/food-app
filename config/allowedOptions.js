const allowedOrigin = require("./allowedOrigin")

const corsOptions = [
    {
        origin : (origin , callback)=>{
            if(allowedOrigin.includes(origin) || !origin){
            /*callback(null , true) means : error : null allowed : true*/
                callback(null , true) 
            }else{
                callback(new Error("Not allowed by CORS"))
            }
        },
        credentials : true,
        optionsSuccessStatus : 200
    }, 
]

module.exports = corsOptions