const getReviewsController = (reviewsService) => {
  return {
    async findAllReviewsByRestaurantId(req, res) {
      const restaurantId = req.params.restaurantId;
      const reviews = await reviewsService.findAllReviewsByRestaurantId(
        restaurantId
      );
      return res.json(reviews);
    },
  };
};
module.exports = getReviewsController
