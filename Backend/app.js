//Import and activate express
const express = require("express");
const app = express();

//Create a server
const http = require("http").Server(app);

//Import and connect mongoose
const mongoose = require("mongoose");

//Converting incoming and outgoing data to JSON
app.use(express.json());

//Establishing and listening to an environmental port, or a default port
const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Listening on port ${port}`));
