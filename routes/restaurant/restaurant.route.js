const express = require("express")
const router = express.Router()
const {createRestaurant , getAllRestaurantsController, getRestaurantById} = require("../../controllers/restaurant/restaurant.controller")
const authMiddleware = require("../../middlewares/auth.middleware")


router.post("/create" ,authMiddleware,createRestaurant)
router.get("/getAllRestaurants" ,authMiddleware,getAllRestaurantsController)
router.get("/getRestaurantById/:id" ,authMiddleware,getRestaurantById)

module.exports = router
