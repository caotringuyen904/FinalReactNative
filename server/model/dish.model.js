const { Schema, Types, model } = require("mongoose");

const schema = new Schema({
  restaurantId: { type: Types.ObjectId },
  name: { type: String },
  price: { type: Number },
  imagePath: { type: String },
});

const Dish = model("Dish", schema);

module.exports = Dish
