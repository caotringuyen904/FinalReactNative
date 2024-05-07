const restaurantController = require("../controller/restaurant.controller")
const router = require("express").Router()



router.get("/", restaurantController.getAllRestaurants)
router.get("/:id", restaurantController.getRestaurantById)

module.exports = router
