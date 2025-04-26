const express = require("express");
const router = express.Router({ mergeParams: true });
const errorHandler = require("../utils/errorHandler.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Post review route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  errorHandler(reviewController.create)
);

// Delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  errorHandler(reviewController.delete)
);

module.exports = router;
