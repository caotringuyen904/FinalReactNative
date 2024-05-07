const getRestaurantsController = (restaurantsService) => {
  return {
    async findAllRestaurantsRecommend(req, res) {
      const restaurants = await restaurantsService.findAllRestaurantsRecommend();
      return res.json(restaurants);
    },

    async findAllRestaurants(req, res) {
      const restaurants = await restaurantsService.findAllRestaurants();
      return res.json(restaurants);
    },

    async findOneRestaurant(req, res) {
      const restaurantId = req.params.restaurantId;
      const restaurant = await restaurantsService.findOneRestaurant(
        restaurantId
      );
      return res.json(restaurant);
    },
  };
};

module.exports = getRestaurantsController
