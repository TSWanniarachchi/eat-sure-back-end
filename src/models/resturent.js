const mongoose = require("mongoose");

// Address Field
const addressField = mongoose.Schema(
  {
    no: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
  },
  { _id: false }
);

// Location Field
const locationField = mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false }
);

// Opening Field
const openingField = mongoose.Schema(
  {
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
  },
  { _id: false }
);

// images Field
const imagesField = mongoose.Schema(
  {
    logoPrimary: { type: String, required: true },
    logoSecondary: { type: String, required: true },
  },
  { _id: false }
);

const resturentSchema = new mongoose.Schema({
  resturentNo: { type: String, required: true, unique: true, maxlength: 10 },
  name: { type: String, required: true, minlength: 5 },
  address: addressField,
  location: locationField,
  opening: openingField,
  contactNo: { type: String, required: true, minlength: 10, maxlength: 10 },
  email: { type: String, required: true, unique: true },
  description: { type: String, required: false, maxlength: 250 },
  image: imagesField,
  createdDateTime: { type: Date, default: Date.now() },
});

// Create an instance of model Outlet
const Resturent = mongoose.model("resturent", resturentSchema);

module.exports = Resturent;
