const mongoose = require("mongoose");

// Nutrition Facts Field
const NutritionFactsField = mongoose.Schema(
  {
    servingSize: { type: Number, required: true, minlength: 2 },
    calories: { type: Number, required: true, minlength: 5 },
    totalFat: { type: String, required: false },
    saturatedFat: { type: String, required: false },
    cholesterol: { type: String, required: false },
    sodium: { type: String, required: false },
    carbohydrate: { type: String, required: false },
    sugars: { type: String, required: false },
    protein: { type: String, required: false },
    vitamin: { type: String, required: false },
    calcium: { type: String, required: false },
    Iron: { type: String, required: false },
  },
  { _id: false }
);

const foodSchema = new mongoose.Schema({
  foodId: { type: String, required: true, unique: true },
  name: { type: String, required: true, minlength: 5 },
  cuisinesType: { type: String, required: true },
  mealType: { type: String, required: true },
  category: { type: String, required: true },
  ingredients: { type: Array, required: true, default: [] },
  nutritionFacts: NutritionFactsField,
  rating: { type: Number, required: true, min: 0, max: 5 },
  imageUrl: { type: String, required: true },
  description: { type: String, required: false, maxlength: 250 },
  isActive: { type: Boolean, required: true, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});

// Create an instance of model Outlet
const Food = mongoose.model("foods", foodSchema);

module.exports = Food;
