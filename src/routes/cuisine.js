const express = require("express");
const cuisineRouter = express.Router();
const cuisineModel = require("../models/cuisine");

// Insert cuisine type detail
cuisineRouter.post("/", async (req, res) => {
  try {
    let cuisine = new cuisineModel({
      cuisineId: req.body.cuisineId,
      name: req.body.name,
    });

    const newCuisine = await cuisine.save();
    res.status(200).send(newCuisine);
    // console.log("Successfully Inserted");
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get all cuisine type detail
cuisineRouter.get("/", async (req, res) => {
  try {
    let cuisines = await cuisineModel.find();

    res.status(200).send(cuisines);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

//update cuisine type details by cuisineId
cuisineRouter.put("/:cuisineId", async (req, res) => {
  try {
    let cuisine = await cuisineModel.findOne({
      cuisineId: req.params.cuisineId,
    });

    if (!cuisine) {
      let errorObj = {
        message:
          "The given cuisine id does not match any cuisine type on our system",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    } else {
      let isChange = false;

      if (cuisine.name != req.body.name) {
        cuisine.name = req.body.name;
        isChange = true;
      }
      if (cuisine.isActive != req.body.isActive) {
        cuisine.isActive = req.body.isActive;
        isChange = true;
      }

      if (isChange) {
        let updateCuisine = await cuisine.save();
        // res.status(200).send(updateCuisine);
        res.status(200).send("Successfully Updated!");
      }
    }
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

// Delete cuisine type details by cuisineId
cuisineRouter.delete("/:cuisineId", async (req, res) => {
  try {
    let cuisine = await cuisineModel.findOne({
      cuisineId: req.params.cuisineId,
    });

    if (!cuisine) {
      let errorObj = {
        message:
          "The given cuisine id does not match any cuisine on our system",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    }

    const deletecuisine = await cuisineModel.deleteOne({
      cuisineId: req.params.cuisineId,
    });
    //res.status(200).json(deleteuser);
    res.status(200).send("Successfully Deleted!");
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

module.exports = cuisineRouter;
