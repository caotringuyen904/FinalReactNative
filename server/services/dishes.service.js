const getDishesService = (DishModel) => {
  return {
    async findAllDishesByRestaurantId(restaurantId) {
      const dishes = await DishModel.find({ restaurantId });
      return dishes;
    },
  };
};

module.exports = getDishesService
