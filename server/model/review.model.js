const { Schema, Types, model } = require ("mongoose");

const schema = new Schema({
  restaurantId: { type: Types.ObjectId },
  comment: { type: String },
  reviewerName: { type: String },
  rating: { type: Number },
});

const Review = model("Review", schema);
module.exports = Review