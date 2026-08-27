const mongoose = require("mongoose")


const resturantSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , "title is required"]
    },
    imageUrl : {
        type : String,
    },
    food : {
        type : Array
    },
    isOpen : {
        type : Boolean,
        default : false
    },
    time : {
        type : String,
    },
    pickup :{
        type : Boolean,
        default : true
    },
    delivery : {
        type : Boolean,
        default : true
    },
    logoUrl : {
        type : String,
    },
    rating : {
        type : Number,
        default : 1,
        min : 1,
        max : 5
    },
    ratingCount : {
        type : Number
    },
    code : {
        type : String,
    },
    coords : {
        id : {type :String},
         latitude : {
            type : Number
        },
        longitude : {
            type : Number
        },
        address : {
            type : String,
        },
        title : {
            type : String,
        }
    }
},{timestamps : true})


const resturantModel = mongoose.model("Resturant", resturantSchema)

module.exports = resturantModel
