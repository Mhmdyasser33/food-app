const restaurantModel = require("../../models/restaurant.model");
const {createRestaurantService,getAllRestaurantService,getRestaurantByIdService} = require("../../services/restaurant.service")
const createRestaurant = async(req , res , next)=>{

    try {
        const newRestaurant = await createRestaurantService(req.body);
        await newRestaurant.save();
        return res.status(201).json({message : "restaurant created successfully" , data : {
            restaurant : newRestaurant
        }})
    } catch (error) {
        return next(error);
    }
}
const getAllRestaurantsController = async(req , res , next)=>{
    try {
        const getAllRestaurants = await getAllRestaurantService();
        return res.status(200).json({message : "all restaurants fetched successfully" , 
            length : getAllRestaurants.length,
            data : {
            restaurants : getAllRestaurants
        }})
        
    } catch (error) {
        return next(error);
    }
}
const getRestaurantById = async(req , res , next) =>{
    try{
        const {id} = req.params;
        const restaurant = await getRestaurantByIdService(id);
        return res.status(200).json({message : "Restaurant fetched successfully" , data : {
            restaurant
        }})

    }catch(error){
        return next(error);
    }

}

module.exports = {createRestaurant,getAllRestaurantsController,getRestaurantById}