const express = require("express");
const router = express.Router();

const AllCars = require("./../db/CarMakes.json");

const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  res.status(200).json("All good in here");
});

router.get("/api/allcars", async (req, res, next) => {
  try {
    res.status(200).json(AllCars);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/api/upload",
  fileUploader.single("imageUrl"),
  (req, res, next) => {
    // console.log("file is: ", req.file)
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ secure_url: req.file.path });
  }
);

module.exports = router;
