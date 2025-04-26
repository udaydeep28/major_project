const express = require("express");
const router = express.Router();
const errorHandler = require("../utils/errorHandler.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

// Index Route
router.get("/", errorHandler(listingController.index));

// New Route
router.get("/new", isLoggedIn, listingController.new);

// Show Route
router.get("/:id", errorHandler(listingController.show));

// Create Route
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  errorHandler(listingController.create)
);

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  errorHandler(listingController.edit)
);

// Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  errorHandler(listingController.update)
);

// Delete Route
router.delete("/:id", isLoggedIn, errorHandler(listingController.delete));

module.exports = router;
