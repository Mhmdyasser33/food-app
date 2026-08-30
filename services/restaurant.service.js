const restaurantModel = require("../models/restaurant.model")

const createRestaurantService = (data)=>{
const {title , imageUrl , food , isOpen , time , pickup , delivery , logoUrl , rating , ratingCount , code , coords} = data
 if(!title || !imageUrl || !food || !isOpen || !time || !pickup || !delivery || !logoUrl || !rating || !ratingCount || !code || !coords.id || !coords.latitude || !coords.longitude || !coords.address || !coords.title){
           const err = new Error("all fields is required")
           err.statusCode = 400
           throw err
        }
        const newRestaurant =  new restaurantModel({
                    title,
                    imageUrl,
                    food,
                    isOpen,
                    time,
                    pickup,
                    delivery,
                    logoUrl,
                    rating,
                    ratingCount,
                    code,
                    coords
                })
        return newRestaurant
}

const getAllRestaurantService = async ()=>{
    const restaurants = await restaurantModel.find({});
    if(!restaurants){
            const err = new Error("No restaurants found")
            err.statusCode = 404
            throw err
        }
    return restaurants
}

const getRestaurantByIdService = async(id)=>{
    const restaurant = await restaurantModel.findById(id);
    if(!restaurant){
            const err = new Error("Restaurant not found")
            err.statusCode = 404
            throw err
        }
        return restaurant
}

module.exports = {createRestaurantService,getAllRestaurantService,getRestaurantByIdService}