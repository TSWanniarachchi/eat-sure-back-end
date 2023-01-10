const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

// Location Field
const locationField = mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 5, unique: true },
  fullName: { type: String, required: true, minlength: 5 },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  location: locationField,
  contactNo: { type: String, required: true, minlength: 10, maxlength: 10 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});

// Create an instance of model Outlet
const User = mongoose.model("user", userSchema);

module.exports = User;
