const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/user.model");
const Car = require("../models/car.model");
const Rating = require("../models/rating.model");

// for everyone

router.get("/api/cars", async (req, res, next) => {
  try {
    const allCars = await Car.find();
    res.status(200).json(allCars); // load all cars without ratings
  } catch (error) {
    next(error);
  }
});

// for users

// ratings of one car
router.get("/api/onecar/:carID", async (req, res, next) => {
  try {
    const { carID } = req.params;
    const foundCar = await Car.findById(carID).populate("ratings");
    res.status(200).json(foundCar); // load ratings for one Car
  } catch (error) {
    next(error);
  }
});

// one rating
router.get("/api/rating/:ratingID", async (req, res, next) => {
  try {
    const { ratingID } = req.params;

    const foundRating = await Rating.findById(ratingID).populate("user carId");
    res.status(200).json(foundRating); // load one rating
  } catch (error) {
    next(error);
  }
});

// addrating form
router.get("/api/newrating", async (req, res, next) => {
  try {
    res.status(200).json("Workes"); // load form to add new rating
  } catch (error) {
    next(error);
  }
});

// add rating
router.post("/api/newrating", async (req, res, next) => {
  try {
    let CarId;
    const { user, brand, model, title, description, totalScore, ratings } = req.body;
    const foundCar = await Car.findOne({ brand: brand, model: model }); // find car by brand and models

    if (!foundCar) {
      const newCar = await Car.create({ brand, model });

      CarId = newCar._id;
    } else {
      CarId = foundCar._id;
    }

    const newRating = {
      user: user,
      carId: CarId,
      title: title,
      description: description,
      totalScore: totalScore,
      ratings: ratings,
    };

    const createdRating = await Rating.create(newRating);

    await Car.findByIdAndUpdate(CarId, {
      $push: { ratings: createdRating._id, overallTotalScore: createdRating.totalScore },
    });

    // update totalscore here

    await User.findByIdAndUpdate(user, {
      $push: { ratings: createdRating._id },
    });
    res.status(201).json(createdRating); // Created
  } catch (error) {
    next(error);
  }
});

// add rating form

module.exports = router;
