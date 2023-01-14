const express = require("express");
const async = require("async");
const favoriteRouter = express.Router();
const favoriteModel = require("../models/favorite");
const foodModel = require("../models/food");

// Insert favorite food item detail
favoriteRouter.post("/", async (req, res) => {
  try {
    //Check mandatory value userId
    if (!req.body.userId) {
      let errorObj = {
        message: "userId is required.",
        status: "SYSTEM ERROR",
      };
      return res.status(400).send(errorObj);
    }

    //Check mandatory value foodId
    if (!req.body.foodId) {
      let errorObj = {
        message: "foodId Id is required.",
        status: "SYSTEM ERROR",
      };
      return res.status(400).send(errorObj);
    }

    //Check food is alredy added
    let checkExistFavoriteFood = await favoriteModel.findOne({
      userId: req.body.userId,
      foodId: req.body.foodId,
    });

    if (checkExistFavoriteFood) {
      let errorObj = {
        message: "This food is alredy added.",
        status: "ALREDY EXIST",
      };
      return res.status(400).send(errorObj);

      // console.log("This food data is alredy added.");
    }

    //Insert favorite food data
    let favoriteFood = new favoriteModel({
      userId: req.body.userId,
      foodId: req.body.foodId,
    });

    const newFavoriteFood = await favoriteFood.save();
    res.status(200).send(newFavoriteFood);
    // console.log("Successfully Inserted");
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get favorite food item details by user id
favoriteRouter.get("/:userId", async (req, res) => {
  try {
    // let favoriteFoods = await favoriteModel.findById(req.params.userId);
    let favoriteFoods = await favoriteModel
      .find({
        userId: req.params.userId,
      })
      .sort({
        createdDateTime: "desc",
      });

    if (favoriteFoods.length === 0) {
      let errorObj = {
        message:
          "The given user does not match any favorite food items on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    //If has user wise favorite foods, then get food details
    let foods = await async.map(favoriteFoods, async (food) => {
      return await foodModel.findOne({ foodId: food.foodId }).select({
        foodId: 1,
        name: 1,
        cuisinesType: 1,
        mealType: 1,
        category: 1,
        ingredients: 1,
        nutritionFacts: 1,
        rating: 1,
        imageUrl: 1,
        isActive: 1,
      });
    });

    if (!foods) {
      let errorObj = {
        message:
          "The given food Id by favorite list but, does not match any food on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(foods);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Delete favorite food by userId & foodId
favoriteRouter.delete("/:userId/:foodId", async (req, res) => {
  try {
    //Check favorite food is alredy added in the system
    let checkExistFavoriteFood = await favoriteModel.findOne({
      userId: req.params.userId,
      foodId: req.params.foodId,
    });

    if (!checkExistFavoriteFood) {
      let errorObj = {
        message:
          "The given user Id & food Id does not match any favorite food on our system",
        statusCode: "SYSTEM ERROR : NOT FOUND",
      };
      return res.status(404).send(errorObj);
    }

    //Delete favorite food
    let deleteFavoriteFood = await favoriteModel.findOneAndDelete({
      userId: req.params.userId,
      foodId: req.params.foodId,
    });

    // res.status(200).send(deleteFavoriteFood);
    res.status(200).send("Successfully Deleted!");
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = favoriteRouter;
