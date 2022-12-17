const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/user");

// Insert user detail
userRouter.post("/", async (req, res) => {
  try {
    const user = new userModel({
      username: req.body.username,
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      location: {
        latitude: req.body.location.latitude,
        longitude: req.body.location.longitude,
      },
      contactNo: req.body.contactNo,
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = await user.save();
    res.status(200).send(newUser);
  } catch (err) {
    l;
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get all users details
userRouter.get("/", async (req, res) => {
  try {
    let users = await userModel.find();

    res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get user details by Username & Password
userRouter.get("/:username/:password", async (req, res) => {
  try {
    let user = await userModel.findOne({
      username: req.params.username,
      password: req.params.password,
    });

    if (!user) {
      let errorObj = {
        message:
          "The given username and password does not match any user on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = userRouter;
