const express = require("express");
const foodRouter = express.Router();
const foodModel = require("../models/food");

// Insert food detail
foodRouter.post("/", async (req, res) => {
  try {
    const food = new foodModel({
      foodId: req.body.foodId,
      name: req.body.name,
      cuisinesType: req.body.cuisinesType,
      mealType: req.body.mealType,
      category: req.body.category,
      ingredients: req.body.ingredients,
      nutritionFacts: {
        servingSize: req.body.nutritionFacts.servingSize,
        calories: req.body.nutritionFacts.calories,
        totalFat: req.body.nutritionFacts.totalFat,
        saturatedFat: req.body.nutritionFacts.saturatedFat,
        cholesterol: req.body.nutritionFacts.cholesterol,
        sodium: req.body.nutritionFacts.sodium,
        carbohydrate: req.body.nutritionFacts.carbohydrate,
        sugars: req.body.nutritionFacts.sugars,
        protein: req.body.nutritionFacts.protein,
        vitamin: req.body.nutritionFacts.vitamin,
        calcium: req.body.nutritionFacts.calcium,
        Iron: req.body.nutritionFacts.Iron,
      },
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

// Get all food details with filterations
foodRouter.get("/", async (req, res) => {
  try {
    let food = [];

    if (req.query.cuisinesType && req.query.mealType) {
      food = await foodModel.find({
        cuisinesType: req.query.cuisinesType,
        mealType: req.query.mealType,
      });
      // console.log("cuisinesType & mealType");
    } else if (req.query.cuisinesType && !req.query.mealType) {
      food = await foodModel.find({
        cuisinesType: req.query.cuisinesType,
      });
      // console.log("cuisinesType");
    } else if (req.query.mealType && !req.query.cuisinesType) {
      food = await foodModel.find({
        mealType: req.query.mealType,
      });
      // console.log("mealType");
    } else {
      food = await foodModel.find();
      // console.log("All");
    }

    if (food.length === 0) {
      let errorObj = {
        message: "Not found any food on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(food);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get food details by food Id
foodRouter.get("/:foodId", async (req, res) => {
  try {
    // let food = await foodModel.findById(req.params.foodId);
    let food = await foodModel.findOne({
      foodId: req.params.foodId,
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

// Delete food details by food Id
foodRouter.delete("/:foodId", async (req, res) => {
  try {
    let food = await foodModel.findOne({
      foodId: req.params.foodId,
    });

    if (!food) {
      let errorObj = {
        message: "The given food id does not match any food on our system",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    }

    const deleteFood = await foodModel.deleteOne({
      foodId: req.params.foodId,
    });
    //res.status(200).json(deleteFood);
    res.status(200).send("Successfully Deleted!");
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

module.exports = foodRouter;
