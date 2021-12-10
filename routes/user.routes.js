const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Car = require("../models/car.model");
const Rating = require("../models/rating.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

//Get current user info AND RATINGS
router.get("/api/user", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const user = await User.findById(currentUser._id).populate("ratings");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/api/user/edit", isAuthenticated, async (req, res, next) => {
  try {
    const currentUser = req.payload;
    res.status(200).json(currentUser);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/current  - Update the current user
router.put("/api/user/edit", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const { email, name, image } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { email, name, image },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// delete user
router.delete("/api/user/delete/", isAuthenticated, async (req, res, next) => {
  try {
    const currentUser = req.payload;
    // delete all ratings awell ?

    await User.findByIdAndDelete(currentUser._id);
    res.status(200).json("User has been delted");
  } catch (error) {
    next(error);
  }
});

// show form to edit one rating
router.get(
  "/api/rating/edit/:ratingID",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const currentUser = req.payload;
      const userID = currentUser._id;

      const { ratingID } = req.params;

      const oneRating = await Rating.findOne({
        user: userID,
        _id: ratingID,
      });

      res.status(200).json(oneRating); // load one rating
    } catch (error) {
      next(error);
    }
  }
);

//  edit for one rating
router.put(
  "/api/rating/edit/:ratingID",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { ratingID } = req.params;

      const { title, description, ratings } = req.body;

      const updatedRating = await Rating.findByIdAndUpdate(
        ratingID,
        { title, description, ratings },
        { new: true }
      );

      res.status(200).json(updatedRating); // load one rating
    } catch (error) {
      next(error);
    }
  }
);

// delete the rating of a car
router.delete("/api/rating/delete/:ratingID", async (req, res, next) => {
  try {
    const { ratingID } = req.params;

    await Rating.findByIdAndDelete(ratingID);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
