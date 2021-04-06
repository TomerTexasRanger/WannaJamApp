//Import and activate express router in order to spread the routes into multiple files
const express = require("express");
const router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public

router.get("/", (req, res) => {
  res.send("Profile Route");
});

module.exports = router;
