//Import and connect mongoose, using async/await to handle the Promise
const mongoose = require("mongoose");
const config = require("./default.json");
const db = config.mongoURI;
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongoDB...");
  } catch (err) {
    console.error(err.message);
    //Terminates the process in order for the app to fail in case of a connection error
    process.exit(1);
  }
};

module.exports = connectDB;
