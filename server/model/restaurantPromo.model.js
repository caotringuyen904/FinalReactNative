const { Schema, model } = require ("mongoose");

const schema = new Schema({
  name: { type: String },
  rate: { type: Number },
  address: { type: String },
  openHours: { type: String },
  imagePath: { type: String },
});

const RestaurantPromo = model("RestaurantPromo", schema);

module.exports = RestaurantPromo
