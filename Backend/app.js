//Import and activate express
const express = require("express");
const app = express();

//Create a server
const http = require("http").Server(app);

//Import and connect mongoose, using async/await to handle the Promise
const mongoose = require("mongoose");
const config = require("./config/default.json");
const db = config.mongoURI;
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB...");
  } catch (err) {
    console.error(err.message);
    //Terminates the process in order for the app to fail in case of a connection error
    process.exit(1);
  }
};
connectDB();
//Converting incoming and outgoing data to JSON
app.use(express.json());

//Establishing and listening to an environmental port, or a default port
const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Listening on port ${port}`));
