const mongoose = require("mongoose");

const cuisineSchema = new mongoose.Schema({
  cuisineId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});

// Create an instance of model Cuisine
const Cuisine = mongoose.model("cuisines", cuisineSchema);

module.exports = Cuisine;
