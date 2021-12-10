const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ratingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" }, // ref to User
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
  title: { type: String, required: true }, // by User input
  description: { type: String, required: true }, // by User input
  totalScore: { type: Number }, // calced by all the other ratings
  ratings: {
    Weekend: {
      // by User input
      style: { type: Number, required: true },
      Acceleration: { type: Number, required: true },
      Handling: { type: Number, required: true },
      FunFactor: { type: Number, required: true },
      CoolFactor: { type: Number, required: true },
      totalWeekend: { type: Number },
    },
    Daily: {
      features: { type: Number, required: true },
      comfort: { type: Number, required: true },
      quality: { type: Number, required: true },
      practicality: { type: Number, required: true },
      value: { type: Number, required: true },
      totalDaily: { type: Number },
    },
  },
});

module.exports = model("Rating", ratingSchema);
