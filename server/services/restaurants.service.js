const getRestaurantsService = (RestaurantModel) => {
  return {
    async findAllRestaurantsRecommend() {
      const restaurants = await RestaurantModel.find({ rate: { $gt: 3 } });
      return restaurants;
    },

    async findAllRestaurants() {
      const restaurants = await RestaurantModel.find();
      return restaurants;
    },

    async findOneRestaurant(restaurantId) {
      const restaurant = await RestaurantModel.findById(restaurantId);
      return restaurant;
    },
  };
};

module.exports = getRestaurantsService