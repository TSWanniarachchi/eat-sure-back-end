const mongoose = require("mongoose");

// Location Field
const locationField = mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false }
);

// Nutrition Facts Field
const NutritionFactsField = mongoose.Schema(
  {
    servingSize: { type: Number, required: true, minlength: 2 },
    calories: { type: Number, required: true, minlength: 4 },
    totalFat: { type: Number, required: true, minlength: 4 },
    saturatedFat: { type: Number, required: true, minlength: 4 },
    cholesterol: { type: Number, required: true, minlength: 4 },
    sodium: { type: Number, required: true, minlength: 4 },
    carbohydrate: { type: Number, required: true, minlength: 4 },
    sugars: { type: Number, required: true, minlength: 4 },
    protein: { type: Number, required: true, minlength: 4 },
    vitamin: { type: Number, required: true, minlength: 4 },
    calcium: { type: String, required: true, minlength: 10 },
    Iron: { type: Number, required: true, minlength: 4 },
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
