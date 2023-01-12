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

//update user details by username
userRouter.put("/:username", async (req, res) => {
  try {
    let user = await userModel.findOne({
      username: req.params.username,
    });

    if (!user) {
      let errorObj = {
        message:
          "The given username and password does not match any user on our system",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    } else {
      let isChange = false;

      if (user.fullName != req.body.fullName) {
        user.fullName = req.body.fullName;
        isChange = true;
      }
      if (user.dateOfBirth != req.body.dateOfBirth) {
        user.dateOfBirth = req.body.dateOfBirth;
        isChange = true;
      }
      if (user.gender != req.body.gender) {
        user.gender = req.body.gender;
        isChange = true;
      }
      if (user.location.latitude != req.body.location.latitude) {
        user.location.latitude = req.body.location.latitude;
        isChange = true;
      }
      if (user.location.longitude != req.body.location.longitude) {
        user.location.longitude = req.body.location.longitude;
        isChange = true;
      }
      if (user.contactNo != req.body.contactNo) {
        user.contactNo = req.body.contactNo;
        isChange = true;
      }
      if (user.email != req.body.email) {
        user.email = req.body.email;
        isChange = true;
      }

      if (isChange) {
        let updateUser = await user.save();
        // res.status(200).send(updateUser);
        res.status(200).send("Successfully Updated!");
      }
    }
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

//update user password by username and oldPassword
userRouter.put("/:username/:oldPassword", async (req, res) => {
  try {
    let user = await userModel.findOne({
      username: req.params.username,
      password: req.params.oldPassword,
    });

    if (!user) {
      let errorObj = {
        message:
          "The given username and password does not match any user on our system",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    } else {
      let isChange = false;

      if (user.password != req.body.newPassword) {
        user.password = req.body.newPassword;
        isChange = true;
      } else {
        res.status(200).send("New Password and Old Password are Same.");
      }

      if (isChange) {
        let updateUser = await user.save();
        // res.status(200).send(updateUser);
        res.status(500).send("Password Successfully Updated!");
      }
    }
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

// Delete user details by username
userRouter.delete("/:username", async (req, res) => {
  try {
    let user = await userModel.findOne({
      username: req.params.username,
    });

    if (!user) {
      let errorObj = {
        message: "The given username does not match any user on our system",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    }

    const deleteuser = await userModel.deleteOne({
      username: req.params.username,
    });
    //res.status(200).json(deleteFoodOutlet);
    res.status(200).send("Successfully Deleted!");
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

module.exports = userRouter;
