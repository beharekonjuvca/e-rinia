const express = require("express");
const eventController = require("../controllers/eventController");
const {
  authMiddlewareOrganization,
  authorizeRole: authorizeRoleOrganization, // Rename for clarity
} = require("../controllers/organizationController");

const {
  authMiddlewareAdmin,
  authorizeRole: authorizeRoleAdmin, // Rename for clarity
} = require("../controllers/adminController");

const router = express.Router();

// Use authMiddlewareOrganization and authorizeRoleOrganization for organization-specific routes
router.post(
  "/",
  authMiddlewareOrganization,
  authorizeRoleOrganization("organization"),
  eventController.createEvent
);
router.put(
  "/:id",
  authMiddlewareOrganization,
  authorizeRoleOrganization("organization"),
  eventController.updateEvent
);
router.delete(
  "/:id",
  authMiddlewareOrganization,
  authorizeRoleOrganization("organization"),
  eventController.deleteEvent
);

// Use authMiddlewareAdmin and authorizeRoleAdmin for admin-specific routes
router.put(
  "/:id/approve",
  authMiddlewareAdmin,
  authorizeRoleAdmin("admin"),
  eventController.approveEvent
);

// Routes accessible to all users
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEvent);

module.exports = router;
