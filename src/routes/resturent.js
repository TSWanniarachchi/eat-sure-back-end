const express = require("express");
const resturentRouter = express.Router();
const resturentModel = require("../models/resturent");

// Insert resturent detail
resturentRouter.post("/", async (req, res) => {
  try {
    const resturent = new resturentModel({
      resturentId: req.body.resturentId,
      name: req.body.name,
      address: {
        no: req.body.address.no,
        street: req.body.address.street,
        city: req.body.address.city,
      },
      location: {
        latitude: req.body.location.latitude,
        longitude: req.body.location.longitude,
      },
      opening: {
        openTime: req.body.opening.openTime,
        closeTime: req.body.opening.closeTime,
      },
      contactNo: req.body.contactNo,
      email: req.body.email,
      description: req.body.description,
      image: {
        logoPrimary: req.body.image.logoPrimary,
        logoSecondary: req.body.image.logoSecondary,
      },
    });

    const newResturent = await resturent.save();
    res.status(200).send(newResturent);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get all resturents details
resturentRouter.get("/", async (req, res) => {
  try {
    let resturents = await resturentModel.find();

    res.status(200).send(resturents);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get resturents details by resturent Id
resturentRouter.get("/:resturentId", async (req, res) => {
  try {
    // let resturent = await resturentModel.findById(req.params.resturentId);
    let resturent = await resturentModel.findOne({
      resturentId: req.params.resturentId,
    });

    if (!resturent) {
      let errorObj = {
        message:
          "The given resturent Id does not match any resturent on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(resturent);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = resturentRouter;
