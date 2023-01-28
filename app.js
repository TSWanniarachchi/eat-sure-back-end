const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Crete a Express Framework
const app = express();

//Add Routes
const userRouter = require("./src/routes/user");
const cuisineRouter = require("./src/routes/cuisine");
const foodRouter = require("./src/routes/food");
const favoriteRouter = require("./src/routes/favorite");

// Add Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/cuisines", cuisineRouter);
app.use("/api/foods", foodRouter);
app.use("/api/favorites", favoriteRouter);

//Config .env
dotenv.config();

// Declare a PORT
const PORT = process.env.APP_RUNNING_PORT || 3000;

// Check runing port
app.listen(PORT, () => {
  console.log(`Successfully runing on Port : ${PORT}`);
});

// Mongo DB Connections
mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb !"))
  .catch((err) => console.log(`Error has occured: ${err}`));
