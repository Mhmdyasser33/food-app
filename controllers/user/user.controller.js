const getUser = async(req , res)=>{
    try {
        res.status(200).json({
            message:"User data"
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports = getUser