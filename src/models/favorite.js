const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  foodId: { type: String, required: true },
  createdDateTime: { type: Date, default: Date.now() },
});

// Create an instance of model Favorites
const Favorite = mongoose.model("favorites", favoriteSchema);

module.exports = Favorite;
