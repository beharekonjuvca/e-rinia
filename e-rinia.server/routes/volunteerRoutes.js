const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController"); // Adjust the path as necessary

// Route for volunteer registration
router.post("/register", volunteerController.register);

// Route for volunteer login
router.post("/login", volunteerController.login);
//Protected Routes
// Route to get all volunteers
router.get(
  "/",
  volunteerController.authMiddleware,
  volunteerController.getAllVolunteers
);

// Route to get a single volunteer by ID
router.get(
  "/:id",
  volunteerController.authMiddleware,
  volunteerController.getVolunteer
);

// Route to update a volunteer by ID
router.put(
  "/:id",
  volunteerController.authMiddleware,
  volunteerController.updateVolunteer
);

// Route to delete a volunteer by ID
router.delete(
  "/:id",
  volunteerController.authMiddleware,
  volunteerController.deleteVolunteer
);

module.exports = router;
