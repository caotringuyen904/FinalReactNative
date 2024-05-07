const getDishesController = (dishesService) => {
  return {
    async findAllDishesByRestaurantId(req, res) {
      const restaurantId = req.params.restaurantId;
      console.log(restaurantId);
      const dishes = await dishesService.findAllDishesByRestaurantId(
        restaurantId
      );
      return res.json(dishes);
    },
  };
};

module.exports = getDishesController
