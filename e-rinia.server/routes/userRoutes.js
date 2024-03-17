const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Adjust the path as necessary

// Route for user registration
router.post("/register", userController.register);

module.exports = router;
