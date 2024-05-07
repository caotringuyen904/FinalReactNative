const getReviewsService = (ReviewModel) => {
  return {
    async findAllReviewsByRestaurantId(restaurantId) {
      const reviews = await ReviewModel.findOne({ restaurantId });
      return reviews;
    },
  };
};
module.exports = getReviewsService
