const express = require("express");
const foodRouter = express.Router();
const foodModel = require("../models/food");

// Insert food detail
foodRouter.post("/", async (req, res) => {
  try {
    const food = new foodModel({
      itemId: req.body.itemId,
      name: req.body.name,
      mealType: req.body.mealType,
      category: req.body.category,
      price: req.body.price,
      rating: req.body.rating,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    });

    const newfood = await food.save();
    res.status(200).send(newfood);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get all food details
foodRouter.get("/", async (req, res) => {
  try {
    let foods = await foodModel.find();

    res.status(200).send(foods);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get food details by food Id
foodRouter.get("/:foodId", async (req, res) => {
  try {
    // let food = await foodModel.findById(req.params.foodId);
    let food = await foodModel.findOne({
      itemId: req.params.foodId,
    });

    if (!food) {
      let errorObj = {
        message: "The given food Id does not match any food on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(food);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get food details by meal type
foodRouter.get("/:mealType/mealType", async (req, res) => {
  try {
    let foods = await foodModel.find({
      mealType: req.params.mealType,
    });

    if (!foods) {
      let errorObj = {
        message: "The given meal type does not match any food on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(foods);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get food details by category
foodRouter.get("/:category/category", async (req, res) => {
  try {
    let foods = await foodModel.find({
      category: req.params.category,
    });

    if (!foods) {
      let errorObj = {
        message: "The given category does not match any food on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(foods);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = foodRouter;
