const express = require("express");
const app = express();
const http = require("http").Server(app);
const connectDB = require("./config/db");
//Routes
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
connectDB();

app.use(express.json());

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Listening on port ${port}`));
