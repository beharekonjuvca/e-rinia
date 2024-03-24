const express = require("express");
const organizationController = require("../controllers/organizationController"); // Adjust the path as necessary
const router = express.Router();

// Routes for the Organization
router.post("/", organizationController.createOrganization);
router.post("/login", organizationController.loginOrganization);
//Protected routes
router.get(
  "/",
  organizationController.authMiddlewareOrganization,
  organizationController.getAllOrganizations
);
router.get(
  "/:id",
  organizationController.authMiddlewareOrganization,
  organizationController.getOrganization
);
router.put(
  "/:id",
  organizationController.authMiddlewareOrganization,
  organizationController.updateOrganization
);
router.delete(
  "/:id",
  organizationController.authMiddlewareOrganization,
  organizationController.deleteOrganization
);

module.exports = router;
