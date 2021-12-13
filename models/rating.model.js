const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ratingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  totalScore: { type: Number },
  ratings: {
    weekend: {
      style: { type: Number, required: true },
      acceleration: { type: Number, required: true },
      handling: { type: Number, required: true },
      funfactor: { type: Number, required: true },
      coolfactor: { type: Number, required: true },
      totalweekend: { type: Number },
    },
    daily: {
      features: { type: Number, required: true },
      comfort: { type: Number, required: true },
      quality: { type: Number, required: true },
      practicality: { type: Number, required: true },
      value: { type: Number, required: true },
      totaldaily: { type: Number },
    },
  },
});

module.exports = model("Rating", ratingSchema);
