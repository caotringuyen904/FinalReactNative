const restaurantModel = require("../model/restaurant.model")

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find()
        return res.status(200).json({ message: "Get restaurants success", restaurants })

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findById(req.params.id)
        return res.status(200).json({ message: "Get restaurant success", restaurant })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = {
    getAllRestaurants,
    getRestaurantById
}