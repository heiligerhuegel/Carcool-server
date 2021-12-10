const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Rating = require("../models/rating.model");

const { isAuthenticated, isAdmin } = require("./../middleware/jwt.middleware");

// for admin

// show all users
router.get("/users", isAdmin, async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // load all cars without ratings
  } catch (error) {
    next(error);
  }
});

// show data from one user
router.get("/api/admin/oneuser/:userID", isAdmin, async (req, res, next) => {
  try {
    const { userID } = req.params;
    const foundUser = await User.findById(userID).populate("ratings");
    res.status(200).json(foundUser); // load ratings for one Car
  } catch (error) {
    next(error);
  }
});

// show user edit panel
router.get(
  "/api/admin/oneuser/edit/:userID",
  isAdmin,
  async (req, res, next) => {
    try {
      const { userID } = req.params;

      const foundUser = await User.findById(userID);

      res.status(200).json(foundUser); // load one rating
    } catch (error) {
      next(error);
    }
  }
);

// edit for user
router.put(
  "/api/admin/oneuser/edit/:userID",
  isAdmin,
  async (req, res, next) => {
    try {
      const { userID } = req.params;

      const { email, name, image } = req.body;

      const updatedUser = await Rating.findByIdAndUpdate(
        userID,
        { email, name, image },
        { new: true }
      );

      res.status(200).json(updatedUser); // load one rating
    } catch (error) {
      next(error);
    }
  }
);

// delete user
router.delete("/api/admin/delete/:userID", isAdmin, async (req, res, next) => {
  try {
    const { userID } = req.params;

    await User.findByIdAndDelete(userID);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
