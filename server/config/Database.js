const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const DBconnect = () => {
  mongoose
    .connect(process.env.URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((error) => {
      console.log("Error connecting to MongoDB");
      console.error(error);
      process.exit(1);
    });
};

module.exports = DBconnect;
