const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodId: { type: String, required: true, unique: true },
  name: { type: String, required: true, minlength: 5 },
  mealType: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  imageUrl: { type: String, required: true },
  description: { type: String, required: false, maxlength: 250 },
  isActive: { type: Boolean, required: true, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});

// Create an instance of model Outlet
const Food = mongoose.model("foods", foodSchema);

module.exports = Food;
