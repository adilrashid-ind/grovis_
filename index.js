const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");

// import routes

const authRoutes = require("./src/routes/auth");
const productRoutes = require("./src/routes/product");

// env
env.config();

// mongo
mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.sm300.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Unable to Connect To DB Due to " + error);
  });

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on the port ${process.env.PORT}`);
});
